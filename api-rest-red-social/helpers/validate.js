const validator = require("validator");

const validate = (params) => {
  let validateName =
    !validator.isEmpty(params.name) &&
    validator.isLength(params.name, { min: 3, max: 15 }) &&
    validator.isAlpha(params.name, "es-ES");

  let validateSurname =
    !validator.isEmpty(params.surname) &&
    validator.isLength(params.surname, { min: 3, max: 15 }) &&
    validator.isAlpha(params.surname, "es-ES");
  let validateNick =
    !validator.isEmpty(params.nick) &&
    validator.isLength(params.nick, { min: 3, max: 15 });
  let validateEmail =
    !validator.isEmpty(params.email) && 
    validator.isEmail(params.email);
  let validatePassword = !validator.isEmpty(params.password);

  if (!validateName || !validateSurname || !validateNick || !validateEmail ||!validatePassword ) {
    throw new Error("El nombre no es válido");
  } else {
    console.log("El nombre es válido");
  }
};

module.exports = {
  validate,
};
