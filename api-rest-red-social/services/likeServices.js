// Importar modelo
const Like = require("../models/Like");

const countLikes = async (publicationId) => {
  try {
    const likeCount = await Like.countDocuments({ publication: publicationId });
    return likeCount;
  } catch (error) {
    throw new Error("Error al contar los likes de la publicación");
  }
};

module.exports = {
  countLikes,
};
