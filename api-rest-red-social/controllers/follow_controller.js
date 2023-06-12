//Importar modelo
const Follow = require("../models/Follow");
const User = require("../models/User");

//Importar servicios
const followService = require("../services/followService");

//Importar depenedencias
const mongoosePaginate = require("mongoose-pagination");

// Acciones de prueba
const testFollow = (req, res) => {
  return res.status(200).send({
    message: "mensaje de prueba desde el controlador de follow",
  });
};

//Accion de guardar follow (seguir)
const follow = (req, res) => {
  //Recoger datos de la request
  const params = req.body;

  //Sacar id del usuario identificado
  const identity = req.user;

  //Crear objeto con modelo follow
  let userToFollow = new Follow({
    user: identity.id,
    followed: params.followed,
  });

  //Guardar el follow en bdd
  userToFollow.save((error, followStored) => {
    if (error || !followStored) {
      return res.status(500).send({
        status: "error",
        message: "No se ha podido seguir al usuario",
      });
    }
    return res.status(200).send({
      status: "success",
      identity: req.user,
      follow: followStored,
    });
  });
};

//Accion borrar follow (dejar de seguir)
const unfollow = (req, res) => {
  //Sacar id del usuario identificado
  const userId = req.user.id;

  //Recoger el id del usuario que seguio y quiere dejar de seguir
  const followedId = req.params.id;
  //Comprobar si existe el follow
  Follow.find({
    user: userId,
    followed: followedId,
  }).remove((error, followDeleted) => {
    if (error || !followDeleted) {
      return res.status(500).send({
        status: "error",
        message: "Error al dejar de seguir",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "El follow se ha eliminado correctamente",
      identity: req.user,
      followDeleted,
    });
  });
};

//Listado de usuarios que siguen (Siguiendo)
const getFollowingUsers = (req, res) => {
  //Sacar id del usuario identificado
  let userId = req.user.id;

  //Comprobar si llega el id por la url
  if (req.params.id) {
    userId = req.params.id;
  }

  //Comprobar si me llega la pagina, si no la pagina 1
  let page = 1;

  if (req.params.page) page = req.params.page;
  //Usuarios por pagina
  const itemsPerPage = 99;

  //Find a follow, popular datos de usuario y paginar con mongoose paginate
  Follow.find({ user: userId })
    .populate("followed", "-password -role -__v -email")
    .paginate(page, itemsPerPage, async (error, follows, total) => {
      //Listado de usuarios en comun
      //array de los usuarios del usuario logeado
      let followUserId = await followService.followUserIds(req.user.id);
      return res.status(200).send({
        status: "success",
        message: "Listado de usuarios que sigo",
        follows,
        total,
        pages: Math.ceil(total / itemsPerPage),
        user_following: followUserId.followingClean,
        user_follow_me: followUserId.followersClean,
      });
    });
};

//Listado de usuarios que siguen a otro usuario (Seguidores)
const getFollowedUsers = (req, res) => {
  //Sacar id del usuario identificado
  let userId = req.user.id;

  //Comprobar si llega el id por la url
  if (req.params.id) {
    userId = req.params.id;
  }

  //Comprobar si me llega la pagina, si no la pagina 1
  let page = 1;

  if (req.params.page) page = req.params.page;
  //Usuarios por pagina
  const itemsPerPage = 99;

  Follow.find({ followed: userId })
    .populate("user", "-password -role -__v -email")
    .paginate(page, itemsPerPage, async (error, follows, total) => {

      let followUserId = await followService.followUserIds(req.user.id);

      return res.status(200).send({
        status: "success",
        message: "Listado de usuarios que me siguen",
        follows,
        total,
        pages: Math.ceil(total / itemsPerPage),
        user_following: followUserId.followingClean,
        user_follow_me: followUserId.followersClean,
      });
    });
};
//Exportar acciones
module.exports = {
  testFollow,
  follow,
  unfollow,
  getFollowingUsers,
  getFollowedUsers,
};
