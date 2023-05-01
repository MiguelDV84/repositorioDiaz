const mongoose = require("mongoose");
const DB = "mongodb://127.0.0.1:27017/red-social";

const connection = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Base de datos conectada(red-social)");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  connection,
};
