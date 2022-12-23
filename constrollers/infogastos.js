const { response } = require("express");
const { Detagastos, Gastos, Usuario } = require('../models');
const { Op } = require("sequelize");
// Crear categoria a usuarios registrados 
const crearDetGasto = async(req, res= response) => {
    const dgas_tipo = req.body.dgas_tipo.toUpperCase();
    const {dgas_id,dgas_fecha ,dgas_monto ,dgas_obs ,dgas_user} = req.body;
    const dgas_fotos = ['logo1.png','logoisg.png']
    console.log('dgas_fotos', dgas_fotos);
    
    try { 
    // verificar si ci ya existe
    const infoga  = new Detagastos({ dgas_id,dgas_fecha,dgas_monto,dgas_obs,dgas_user,dgas_tipo});
   console.log('infogasto', infoga.id);
    
    
    // guardar en la db
    await infoga.save();
        
        res.json(infoga);

    } catch (error) {
        console.log('error',error);
        
        res.status(400).json('Información no Válida');
    }
}
// categoria paginados por limites y desde
const detGastoPagina = async(req, res= response) => {
    const {limite = 10, desde= 0 } = req.query;
    
    const query = {where: {  dgas_estado: 0} };

    const [total, detgastos] = await Promise.all([
        Detagastos.count({limit: Number(limite),query}),
        Detagastos.findAll({limit: Number(limite),offset: Number(desde), include: { model: Gastos, as: 'ref_gastos' }}, query)
       //Categoria.findAll({limit: Number(limite),offset: Number(desde), include: { model: Usuario, as: 'ref_Usuario' }}, query)
    ]);

    res.json({
        total, detgastos
    });
}

// categoria por id
const detGastoid = async(req, res= response) => {
    const { id } = req.params;
    const detgastosid = await Detagastos.findByPk(id, {include: { model: Gastos, as: 'ref_gastos' }})
    res.status(200).json({
        detgastosid
    });
}

const detGasUpdate = async(req, res = response ) => {
    const { dgas_id } = req.params;
    const info_detgas = req.body.dgas_obs.toUpperCase();
    const detgasto = await Detagastos.findAll({where: {dgas_id: dgas_id}});
        
    const detgastoUp = await Detagastos.update({dgas_id:dgas_id}, {where: {id:id}})
    res.status(200).json({
        detgastoUp
    });
   
}

const BorrarDetGasto = async(req, res = response ) => {
    const { xid } = req.params;

    try {

        const detgastos = await Detagastos.update({dgas_estado: 1}, {where: {id: xid}});     
       
        res.status(200).json(detgastos);


    } catch (error) {
   
        console.log('error:', error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
}
// buscar por  id
const buscarTipo = async ( req, res = response ) => {

    const { termino } = req.params;
    const jbuscar = termino.toUpperCase();
    
    const {limite = 10, desde= 0 } = req.query;
    
    const detgastos = await Detagastos.findAll({limit: Number(limite),offset: Number(desde), include: [
           { model: Gastos, as: 'ref_gastos' },
           { model: Usuario, as: 'ref_Usuario'},
    ],where: { dgas_tipo: jbuscar }})
 
    
    res.json({
        termino,
         detgastos
    });

}

module.exports ={
    crearDetGasto,
    detGastoid,
    detGastoPagina,
    detGasUpdate,
    BorrarDetGasto,
    buscarTipo
}