//Importar modelo
const Like = require("../models/Likes");

//Importar modulos
const fs = require("fs");
const path = require("path");

//Importar servicios

//Guardar Like
const like = (req, res) => {
    // Recoger ID del usuario de la URL
    const userId = req.params.userId;
  
    // Recoger datos de la request
    const { publication } = req.body;
  
    // Crear objeto con modelo like
    const likeToSave = new Like({
      user: userId,
      publication,
    });
  
    // Guardar like en la bdd
    likeToSave.save((error, likeStored) => {
      if (error || !likeStored) {
        return res.status(500).send({
          status: "error",
          message: "No se ha podido dar like",
        });
      }
  
      return res.status(200).send({
        status: "success",
        like: {
          _id: likeStored.id,
          user: userId,
          publication: likeStored.publication,
          created_at: likeStored.created_at,
        },
      });
    });
  };
  

const dislike = (req, res) => {
  // Recoger datos de la request
  const params = req.body;

  // Sacar id del usuario identificado
  const identity = req.user;

  // Buscar y eliminar el dislike en la bdd
  Like.findOneAndDelete(
    { user: identity._id, publication: params.publication },
    (error, dislikeRemoved) => {
      if (error || !dislikeRemoved) {
        return res.status(500).send({
          status: "error",
          message: "No se ha podido quitar el like",
        });
      }

      return res.status(200).send({
        status: "success",
        message: "like eliminado correctamente",
      });
    }
  );
};

module.exports = {
  like,
  dislike,
};
