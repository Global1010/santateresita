const path = require('path');
const fs   = require('fs');
const { response } = require("express");
const { suberArchivo } = require("../helpers");
const { Usuario, Productos, Detagastos } = require("../models");

const cargarArchivo =  async ( req, res = response) => {

try {
  const nombre = await suberArchivo(req.files,undefined ,'imgs');
  res.json({ nombre });
  
} catch (msg) {
  res.status(400).json({msg})
}
}

const actualizarImagen = async ( req, res= response) => {

  const {id, tabla } = req.params;

  let modelo;

  switch (tabla) {
    case 'usuarios':
      modelo = await Usuario.findByPk(id);
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
      break;

      case 'productos':
      modelo = await Productos.findByPk(id);
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un Producto con el id ${ id }`
        });
      }
      break;

      case 'GASTOS':
        modelo = await Detagastos.findByPk(id);
        if( !modelo ) {
          return res.status(400).json({
            msg: `No existe un Detalle de Gastos con el id ${ id }`
          });
        }
        break;

      default:
      return res.status(500).json({ msg: 'Se me olvido vaidar esto'});
  }

  if( modelo.fotos ) {
    const pathImagen = path.join( __dirname, '../uploads', tabla, modelo.fotos );
    if ( fs.existsSync( pathImagen )) {
      fs.unlinkSync( pathImagen);
    }
  }

  const nombre = await suberArchivo(req.files,undefined ,tabla);
  modelo.fotos = nombre
  modelo.save()
  res.json( modelo )
}

const mostrarImagen = async (req, res = response) => {
  
  const {id, tabla } = req.params;

  let modelo;

  switch (tabla) {
    case 'usuarios':
      modelo = await Usuario.findByPk(id);
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${ id }`
        });
      }
      break;

      case 'productos':
      modelo = await Productos.findByPk(id);
      if( !modelo ) {
        return res.status(400).json({
          msg: `No existe un Producto con el id ${ id }`
        });
      }
      break;

      case 'GASTOS':
        modelo = await Detagastos.findByPk(id);
        if( !modelo ) {
          return res.status(400).json({
            msg: `No existe un Detalle de Gastos con el id ${ id }`
          });
        }
        break;

      default:
      return res.status(500).json({ msg: 'Se me olvido vaidar esto'});
  }

  if( modelo.fotos ) {
    const pathImagen = path.join( __dirname, '../uploads', tabla, modelo.fotos );
    if ( fs.existsSync( pathImagen )) {
        return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join( __dirname, '../assets/no-image.jpg' );
      return res.sendFile(pathImagen);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}