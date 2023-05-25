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
  // Recoger ID de la publicación de la URL
  const publicationId = req.params.publicationId;

  // Buscar y eliminar el like basado en el ID de la publicación
  Like.findOneAndDelete(
    { publication: publicationId },
    (error, deletedLike) => {
      if (error || !deletedLike) {
        return res.status(500).send({
          status: "error",
          message: "No se ha podido eliminar el like",
        });
      }

      return res.status(200).send({
        status: "success",
        message: "Like eliminado correctamente",
      });
    }
  );
};

const countLikes = (req, res) => {
  // Recoger ID de la publicación de la URL
  const publicationId = req.params.publicationId;

  // Contar los likes de la publicación
  Like.countDocuments({ publication: publicationId }, (error, likeCount) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        message: "Error al contar los likes de la publicación",
      });
    }

    return res.status(200).send({
      status: "success",
      count: likeCount,
    });
  });
};

module.exports = {
  like,
  dislike,
  countLikes
};
