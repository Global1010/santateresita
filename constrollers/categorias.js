const { response } = require("express");
const {Categoria,Usuario } = require('../models');

// Crear categoria a usuarios registrados 
const crearCategoria = async(req, res= response) => {

    const cat_descri = req.body.cat_descri.toUpperCase();

    const categoriadb  = await Categoria.findAll({ where: {cat_descri:cat_descri}});

    if (categoriadb.length>0 ) {
        return res.status(400).json({
            msg: `La categoria ${ cat_descri }, ya existe`
        });
    }

const data = {
    cat_descri,
    cat_user: req.usuario.id
}

const categoria = new Categoria(data);
await categoria.save();

    res.status(201).json(categoria);
}
// categoria paginados por limites y desde
const categoriaPaginado = async(req, res= response) => {
    const {limite = 10, desde= 0 } = req.query;
    
    const query = {where: {  cat_estado: 0} };

    const [total, categorias] = await Promise.all([
        Categoria.count({limit: Number(limite),query}),
        Categoria.findAll({limit: Number(limite),offset: Number(desde), include: { model: Usuario, as: 'ref_Usuario' }}, query)
    ]);

    res.json({
        total, categorias
    });
}

// categoria por id
const categoriaid = async(req, res= response) => {
    const { id } = req.params;
    const categoriaId = await Categoria.findByPk(id, {include: { model: Usuario, as: 'ref_Usuario' }})
    res.status(200).json({
        categoriaId
    });
}

const ActualizaCate = async(req, res = response ) => {
    const { id } = req.params;
    const cat_descri = req.body.cat_descri.toUpperCase();
    const categoriaNom = await Categoria.findAll({where: {cat_descri: cat_descri}});
        
    if (categoriaNom.length>0 ) {
        return res.status(400).json({
            msg: `La categoria ${ cat_descri }, ya existe`
        });
    }

    const categorx = await Categoria.update({cat_descri:cat_descri}, {where: {id:id}})
    res.status(200).json({
        categorx
    });
   
}

const BorrarCategoria = async(req, res = response ) => {
    const { xid } = req.params;

    try {

        const categoria = await Categoria.update({cat_estado: 1}, {where: {id: xid}});     
       
        res.status(200).json(categoria);


    } catch (error) {
   
        console.log('error:', error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
}


module.exports ={
    crearCategoria,
    categoriaPaginado,
    categoriaid,
    ActualizaCate,
    BorrarCategoria
}