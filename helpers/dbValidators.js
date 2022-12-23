
const { Categoria, Roles, Usuario, Clientes,Detagastos  } = require('../models');
const Productos = require('../models/producto');


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
//  para verificar que no exista categoria
const existeCategoria = async (idu) => {
  
  const siCategoria = await Categoria.findByPk(idu);
    //ExUSerID === null
if (!siCategoria) {
  throw new Error(`Este--- ${ idu }, no existe en la db`)
}
}
const existeProducto = async (idu) => {
  
  const siProducto = await Productos.findByPk(idu);
    //ExUSerID === null
if (!siProducto) {
  throw new Error(`Este--- ${ idu }, no existe en la db`)
}
}
const existeClie = async (idu) => {
  
  const siCliente = await Clientes.findByPk(idu);
    //ExUSerID === null
if (!siCliente) {
  throw new Error(`Este--- ${ idu }, no existe en la db`)
}
}
const existeDetGas = async (idu) => {
  
  const siDetGasto = await Detagastos.findByPk(idu);
    //ExUSerID === null
if (!siDetGasto) {
  throw new Error(`Este--- ${ idu }, no existe en la db`)
}
}
 const tablasPermitidas = ( tabla = '', tablas = []) => {

  const incluida = tablas.includes( tabla );

  if( !incluida ) {
    throw new Error( `La tabla ${tabla } no es permitida, - ${ tablas }`)
  }

  return true;

 }

  module.exports = {
    rolValido,
    Exci,
    Exmail,
    ExUSerID,
    existeCategoria,
    existeProducto,
    existeClie,
    existeDetGas,
    tablasPermitidas
  }