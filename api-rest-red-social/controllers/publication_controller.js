//Importar modelo
const Publication = require("../models/Publication");

//Importar modulos
const fs = require("fs");
const path = require("path");

//Importar servicios
const followService = require("../services/followService");

// Acciones de prueba
const testPubli = (req, res) => {
  return res.status(200).send({
    message: "mensaje de prueba desde el controlador de publication",
  });
};

//Guarcadar publicacion
const save = (req, res) => {
  // Recoger datos de la request
  const params = req.body;

  // Si no llega dar respuesta negativa
  if (!params.text)
    return res
      .status(400)
      .send({ status: "error", message: "Debes enviar un texto" });

  // Crear objeto con modelo publication
  let newPublication = new Publication(params);
  newPublication.user = req.user.id;

  // Verificar si se adjuntó un archivo
  if (req.file) {
    newPublication.file = req.file.filename;
  }

  // Guardar el objeto en la base de datos
  newPublication.save((error, publicationStored) => {
    if (error || !publicationStored)
      return res
        .status(400)
        .send({ status: "error", message: "No se ha guardado la publicación" });

    return res.status(200).send({
      status: "success",
      message: "Publicación guardada",
      publicationStored,
    });
  });
};


//Sacar una publicacion
const getPubli = (req, res) => {
  //Recoger id de la publicacion
  const publicationId = req.params.id;
  //Buscar publicacion por id
  Publication.findById(publicationId, (error, publicationStored) => {
    if (error || !publicationStored)
      return res.status(404).send({
        status: "error",
        message: "No se ha encontrado la publicacion",
      });
    return res.status(200).send({
      status: "success",
      message: "Publicación guardada",
      publication: publicationStored,
    });
  });
};

//Eliminar publicacion
const remove = (req, res) => {
  //Recoger id de la publicacion
  const publicationId = req.params.id;
  //Buscar publicacion por id y por usuario
  Publication.findOneAndDelete({
    user: req.user.id,
    _id: publicationId,
  }).remove((error) => {
    if (error)
      return res
        .status(500)
        .send({ status: "error", message: "Error al borrar la publicacion" });
    return res
      .status(200)
      .send({ status: "success", message: "Delete", publicationId });
  });
};

//Listar publicaciones de un usuario
const getPublicationsUser = (req, res) => {
  //Recoger id del usuario
  const userId = req.params.id;

  //Controlar pagina
  let page = 1;
  if (req.params.page) page = req.params.page;
  const itemsPerPage = 5;

  //Find, populate, paginar y ordenar
  Publication.find({ user: userId })
    .sort("-created_at")
    .populate("user", "nick created_at image -email")
    .paginate(page, itemsPerPage, (error, publications, total) => {
      if (error || publications.length <= 0)
        return res.status(404).send({
          status: "error",
          message: "No hay publicaciones para mostrar",
        });
      return res.status(200).send({
        status: "success",
        message: "publicaciones de un perfil ",
        page,
        total,
        pages: Math.ceil(total / itemsPerPage),
        publications,
      });
    });
};

//Listar publicaciones de usuarios que sigo

//Subir ficheros
/* const upload = (req, res) => {
  //Sacar publication id
  const publicationId = req.params.id;
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
  Publication.findByIdAndUpdate(
    { user: req.user.id, _id: publicationId },
    { file: req.file.filename },
    { new: true },
    (error, publicationUpdated) => {
      if (error || !publicationUpdated) {
        return res.status(500).send({
          status: "error",
          message: "Error al guardar la imagen del usuario",
        });
      }
      //Devolver respuseta
      return res.status(200).send({
        status: "success",
        publication: publicationUpdated,
        file: req.file,
      });
    }
  );
}; */

//Devolver archivos multimedia
const media = (req, res) => {
  //Sacar el parametro de la url
  const file = req.params.fileName;

  //Montar el path real de la imagen
  const filePath = "./uploads/publications/" + file;

  //Comprobar que existe
  fs.stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "La imagen no existe",
      });
    }
    return res.sendFile(path.resolve(filePath));
  });
};

//Lista publicaciones FEED
const feed = async (req, res) => {
  //Controlar pagina
  let page = 1;
  if (req.params.page) page = req.params.page;
  const itemsPerPage = 5;

  try {
    //Sacar un array de indentificadores de usuarios que yo sigo
    const myFollows = await followService.followUserIds(req.user.id);

    //Find de publicaciones de usuarios que sigo, ordenar, popular y paginar
    const publications = Publication.find({
      user: myFollows.followingClean,
    })
      .populate("user", "-password -role -__v -email")
      .sort("-created_at")
      .paginate(page, itemsPerPage, (error, publications, total) => {

        if(error || !publications) return res.status(404).send({status: "error", message: "No hay publicaciones para mostrar"})
      return res.status(200).send({
        status: "success",
        message: "Lista de publicaciones FEED",
        total,
        page,
        pages: Math.ceil(total / itemsPerPage),
        publications,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", message: "Error en el servidor" });
  }
};

//Exportar acciones
module.exports = {
  testPubli,
  save,
  getPubli,
  remove,
  getPublicationsUser,
  upload,
  media,
  feed,
};
