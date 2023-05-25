//Importar modelo
const Like = require("../models/Likes");

//Importar modulos
const fs = require("fs");
const path = require("path");

//Importar servicios

//Guardar Like
const like = (req, res) => {
  //Recoger datos de la request
  const params = req.body;

  //Sacar id del usuario identificado
  const identity = req.user;

  //Crear objeto con modelo follow
  const likeToSave = new Like({
    user: identity._id,
    publi: params.publi,
  });

  //Guardar like en la bdd
  likeToSave.save((error, likeStored) => {
    if (error || !likeStored) {
      return res.status(500).send({
        status: "error",
        message: "No se ha posible dar like",
      });
    }

    return res.status(200).send({
      status: "success",
      identity: req.user,
      like: likeStored,
    });
  });
};

module.exports = {
    like,
}
