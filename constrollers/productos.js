const { response } = require("express");
const {Productos } = require('../models');

// Crear categoria a usuarios registrados 
const crearProducto= async(req, res= response) => {

    const pro_descri = req.body.pro_descri.toUpperCase();

    const productoadb  = await Productos.findAll({ where: {pro_descri:pro_descri}});

    if (productoadb.length>0 ) {
        return res.status(400).json({
            msg: `La Producto ${ pro_descri }, ya existe`
        });
    }

const data = {
    pro_descri
}

const producto = new Productos(data);
await producto.save();

    res.status(201).json(producto);
}
// categoria paginados por limites y desde
const productoPaginado = async(req, res= response) => {
    const {limite = 10, desde= 0 } = req.query;
    
    const query = {where: {  pro_estado: 0} };

    const [total, productos] = await Promise.all([
        Productos.count({limit: Number(limite),query}),
        Productos.findAll({limit: Number(limite),offset: Number(desde)}, query)
    ]);

    res.json({
        total, productos
    });
}

// categoria por id
const productoid = async(req, res= response) => {
    
    const { id } = req.params;  
    const productoId = await Productos.findByPk(id);
    res.status(200).json({
        productoId
    });
}

const ActualizaProdu = async(req, res = response ) => {
    const { id } = req.params;
    const pro_descri = req.body.pro_descri.toUpperCase();
    const productoNom = await Productos.findAll({where: {pro_descri: pro_descri}});
        
    if (productoNom.length>0 ) {
        return res.status(400).json({
            msg: `El Producto ${ pro_descri }, ya existe`
        });
    }

    const produx = await Productos.update({pro_descri:pro_descri}, {where: {id:id}})
    res.status(200).json({
        produx
    });
   
}

const BorrarProducto = async(req, res = response ) => {
    const { xid } = req.params;

    try {

        const producto = await Productos.update({pro_estado: 1}, {where: {id: xid}});     
       
        res.status(200).json(producto);


    } catch (error) {
   
        console.log('error:', error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
}


module.exports ={
    crearProducto,
    productoPaginado,
    productoid,
    ActualizaProdu,
    BorrarProducto
}