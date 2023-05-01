//Importar dependendcias
const jwt = require("jwt-simple");
const moment = require("moment");

//Clave secreta para codificar el token
const SECRET = "CLAVE_SECRETA_123456789_123456789_123456789";

//Crear una funcion para generar tokens
const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  //Devolver jwt token codificado
  return jwt.encode(payload, SECRET);
};

module.exports = {
    SECRET,
    createToken
}
