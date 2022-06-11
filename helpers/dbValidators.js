const Roles = require('../models/role');
const Usuario = require('../models/usuario');

const rolValido = async (usu_cargo = '') => {
    const existeRol = await Roles.findAll({where: {rol_descri: usu_cargo}});

    if (existeRol.length <= 0 ) {
      throw new Error(`El Cargo ${ usu_cargo } no esta en la lista`)
    }
  }

const Exci = async (usu_ci) => {
  const ciexit = await Usuario.findAll({
    where: {
         usu_ci: usu_ci
    }
});
if (ciexit.length >=1 ) {
  throw new Error(`El Nro ${ usu_ci }, ya esta registrado`)
}
}  
const Exmail = async (usu_email) => {
  const mailext = await Usuario.findAll({
    where: {
      usu_email: usu_email
    }
});
if (mailext.length >=1 ) {
  throw new Error(`El correo ${ usu_email }, ya esta registrado`)
}
}  

const ExUSerID = async (idu) => {
  
  const ExUSerID = await Usuario.findByPk(idu);
    //ExUSerID === null
if (!ExUSerID ) {
  throw new Error(`Este ${ idu }, no existe en la db`)
}
}

  module.exports = {
    rolValido,
    Exci,
    Exmail,
    ExUSerID
  }