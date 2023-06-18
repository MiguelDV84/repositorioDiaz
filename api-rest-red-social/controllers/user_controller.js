//Importar dependencias y modelos
const User = require("../models/User");
const Follow = require("../models/Follow");
const Publication = require("../models/Publication");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-pagination");
const fs = require("fs");
const path = require("path");

//Importar servicios
const jwt = require("../services/jwt");
const followService = require("../services/followService");
const { validate } = require("../helpers/validate");

// Acciones de prueba
const testUser = (req, res) => {
  return res.status(200).send({
    message: "mensaje de prueba desde el controlador de user",
    usuario: req.user,
  });
};

//Registrar usuarios
const register = (req, res) => {
  //Recoger datos de la request
  let params = req.body;

  //Comprobar y Validar datos
  if (
    !params.name ||
    !params.surname ||
    !params.nick ||
    !params.email ||
    !params.password
  ) {
    return res.status(400).send({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  //Validacion avanzada
  try {
    validate(params);
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "Validación no superada",
    });
  }

  //Comprobar si existe el usuario
  User.find({
    $or: [
      { email: params.email.toLowerCase() },
      { nick: params.nick.toLowerCase() },
    ],
  }).exec(async (err, users) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        message: "Error al comprobar duplicidad de usuarios",
      });
    }

    if (users && users.length >= 1) {
      return res.status(400).send({
        status: "error",
        message: "El usuario ya existe",
      });
    }

    //Cifrar la contraseña
    const pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;
    //Crear objeto de usuario
    const user = new User(params);

    //Guardar el usuario
    user.save((err, userSored) => {
      if (err || !userSored) {
        return res.status(500).send({
          status: "error",
          message: "Error al guardar el usuario",
        });
      }
      if (userSored) {
        return res.status(200).send({
          status: "success",
          message: "Usuario registrado correctamente",
          user: userSored,
        });
      }
    });
  });
};

const login = (req, res) => {
  //Recoger datos de la request
  const params = req.body;

  //Comprobamos si hay datos en el body
  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  //Comprobar si existe el usuario
  User.findOne({ email: params.email })
    // .select({ password: 0 })//No devolver el campo password
    .exec((error, user) => {
      if (error || !user) {
        return res.status(400).send({
          status: "error",
          message: "El usuario no existe",
        });
      }
      //Comprobar la contraseña
      const pwd = bcrypt.compareSync(params.password, user.password);

      if (!pwd) {
        return res.status(400).send({
          status: "error",
          message: "La contraseña no es correcta",
        });
      }

      //Generar token de jwt
      const token = jwt.createToken(user);

      //Limpiar el objeto

      //Devolver los datos del usuario logueado
      return res.status(200).send({
        status: "success",
        message: "Usuario logueado correctamente",
        user: {
          id: user._id,
          name: user.name,
          nick: user.nick,
        },
        token,
      });
    });
};

const getUser = (req, res) => {
  //Recibir el id del usuario
  const userId = req.params.id;

  //Comprobar si el usuario existe
  User.findById(userId)
    .select("-password -role -email -__v")
    .exec(async (error, user) => {
      if (error || !user) {
        return res.status(404).send({
          status: "error",
          message: "El usuario no existe",
        });
      }
      //Info de seguimiento
      const followInfo = await followService.followThisUser(
        req.user.id,
        userId
      );

      //Devolver los datos del usuario
      return res.status(200).send({
        status: "success",
        user: user,
        following: followInfo.following,
        followed: followInfo.followers,
      });
    });
};

const list = (req, res) => {
  //Controlar en que pagina estamos
  let page = 1;
  if (req.params.page) {
    page = req.params.page;
  }
  page = parseInt(page);

  //consulta con mongoose paginate
  let itemsPerPage = 5;

  User.find()
    .select("-password -role -email -__v")
    .sort("_id")
    .paginate(page, itemsPerPage, async (error, users, total) => {
      if (error || !users) {
        return res.status(500).send({
          status: "error",
          message: "Error al listar usuarios",
          error,
        });
      }
      //array de los usuarios del usuario logeado
      let followUserId = await followService.followUserIds(req.user.id);
      //Devolver resultado (usuarios, total de usuarios, total de paginas) posteriormente info de follows
      return res.status(200).send({
        status: "success",
        users,
        page,
        itemsPerPage,
        total,
        pages: Math.ceil(total / itemsPerPage),
        user_following: followUserId.followingClean,
        user_follow_me: followUserId.followersClean,
      });
    });
};
const update = (req, res) => {
  // Recoger info del usuario a actualizar
  const userIdentity = req.user;
  const user = req.body;

  // Eliminar campos sobrantes
  delete user.iat;
  delete user.exp;
  delete user.role;
  delete user.image;

  // Comprobar si existe el usuario
  User.find({
    $or: [
      { email: user.email ? user.email.toLowerCase() : null },
      { nick: user.nick ? user.nick.toLowerCase() : null },
    ],
  }).exec(async (err, users) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        message: "Error al comprobar duplicidad de usuarios",
      });
    }

    let userIsset = false;
    users.forEach((existingUser) => {
      if (existingUser && existingUser._id != userIdentity.id) {
        userIsset = true;
      }
    });

    if (userIsset) {
      return res.status(400).send({
        status: "error",
        message: "El usuario ya existe",
      });
    }

    // Si me llega la contraseña, cifrarla
    if (user.password) {
      const pwd = await bcrypt.hash(user.password, 10);
      user.password = pwd;
    } else {
      delete user.password;
    }

    // Actualizar solo los campos no vacíos
    const updatedFields = {};
    for (const field in user) {
      if (user[field] !== "") {
        updatedFields[field] = user[field];
      }
    }

    // Buscar y actualizar
    try {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: userIdentity.id },
        updatedFields,
        { new: true }
      );

      if (!userUpdated) {
        return res.status(500).send({
          status: "error",
          message: "Error al actualizar el usuario",
        });
      }

      // Devolver respuesta
      return res.status(200).send({
        status: "success",
        message: "Método de actualización de usuario",
        userUpdated,
      });
    } catch (error) {
      return res.status(404).send({
        status: "error",
        message: "Error al actualizar el usuario",
      });
    }
  });
};

const upload = (req, res) => {
  //Recoger el fichero de imagen y comprogbar que existe
  if (!req.file) {
    return res.status(404).send({
      status: "error",
      message: "No se ha subido ninguna imagen",
    });
  }

  //Conseguir el nombre y la extension del archivo
  let image = req.file.originalname;
  let imageSplit = image.split(".");
  let extension = imageSplit[1];
  //Comprobar extension (solo imagenes), si no es valida borrar fichero

  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    const path = req.file.path;
    const filedelete = fs.unlinkSync(path);
    return res.status(400).send({
      status: "error",
      message: "La extension de la imagen no es valida",
    });
  }

  //Guardar la imagen en bd
  User.findByIdAndUpdate(
    { _id: req.user.id },
    { image: req.file.filename },
    { new: true },
    (error, userUpdated) => {
      if (error || !userUpdated) {
        return res.status(500).send({
          status: "error",
          message: "Error al guardar la imagen del usuario",
        });
      }
      //Devolver respuseta
      return res.status(200).send({
        status: "success",
        user: userUpdated,
      });
    }
  );
};

const avatar = (req, res) => {
  // Obtener el nombre del archivo del formulario
  const file = req.body.fileName;

  // Montar la ruta real de la imagen
  const filePath = "./uploads/avatars/" + file;

  // Comprobar si existe
  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      return res.status(404).send({
        status: "error",
        message: "La imagen no existe",
      });
    }
    return res.sendFile(path.resolve(filePath));
  });
};

const counters = async (req, res) => {
  let userId = req.user.id;

  if (req.params.id) userId = req.params.id;

  try {
    const following = await Follow.count({ user: userId });

    const followed = await Follow.count({ followed: userId });

    const publications = await Publication.count({ user: userId });

    return res.status(200).send({
      userId,
      following: following,
      followed: followed,
      publications: publications,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error en el servidor",
      error,
    });
  }
};

const getUserByUsername = (req, res) => {
  // Recibir el nombre de usuario
  const username = req.params.username;

  // Comprobar si el usuario existe
  User.findOne({ nick: { $regex: new RegExp('^' + username + '$', 'i') } })
    .select("-password -role -email -__v")
    .exec((error, user) => {
      if (error || !user) {
        return res.status(404).send({
          status: "error",
          message: "El usuario no existe",
        });
      }

      return res.status(200).send({
        status: "success",
        user: user,
      });
    });
};



//Exportar acciones
module.exports = {
  testUser,
  register,
  login,
  getUser,
  list,
  update,
  upload,
  avatar,
  counters,
  getUserByUsername,
};
