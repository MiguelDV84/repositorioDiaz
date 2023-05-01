//Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//Importar clave secreta
const libjwt = require("../services/jwt");
const SECRET = libjwt.SECRET;

//Función de autenticación
exports.auth = (req, res, next) => {
  //Comprobar si me llega la cabecera de auth
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "No se ha enviado la cabecera de autenticación",
    });
  }

  //Limpiar el token
  const token = req.headers.authorization.replace(/['"]+/g, "");

  //Decodicar el token
  try {
    const payload = jwt.decode(token, SECRET);
    

    //Comprobar expiración del token
    if (payload.exp <= moment().unix()) {
      //Si la fecha de expiración es menor a la fecha actual
      return res.status(404).send({
        status: "error",
        message: "El token ha expirado",
      });
    }
    //Agregar datos de usuario a request
    req.user = payload;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "El token no es válido",
      error,
    });
  }

  //Pasar a la acción
  next();
};
