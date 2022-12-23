const { response } = require("express");
const { Clientes } = require('../models');

// Crear categoria a usuarios registrados 
const crearCliente= async(req, res= response) => {

    const { cli_nombre,cli_apelli,cli_cedula,cli_direcc,cli_telefo,cli_ruc,cli_razo,cli_razon,cli_email } = req.body;
           
    try { 
    // verificar si ci ya existe
    const cliente  = new Clientes({ cli_nombre,cli_apelli,cli_cedula,cli_direcc,cli_telefo,cli_ruc,cli_razo,cli_razon,cli_email });
    
    // guardar en la db
    await cliente.save();
        
        res.json(cliente);

    } catch (error) {
        console.log('error',error);
        
        res.status(400).json('Información no Válida');
    }
}
// Clientes paginados por limites y desde
const clientePaginado = async(req, res= response) => {
    const {limite = 10, desde= 0 } = req.query;
    
    const query = {where: {  pro_estado: 0} };

    const [total, clientes] = await Promise.all([
        Clientes.count({limit: Number(limite),query}),
        Clientes.findAll({limit: Number(limite),offset: Number(desde)}, query)
    ]);

    res.json({
        total, clientes
    });
}

// Clientes por id
const clienteid = async(req, res= response) => {
    
    const { id } = req.params;  
    const clienteId = await Clientes.findByPk(id);
    res.status(200).json({
        clienteId
    });
}
// actualizar clientes
const ActualizaClie = async(req, res = response ) => {
  const data = req.body;
  const {id} = req.body;
    console.log('lo que va a actulizar', id);
    
     
    const user = await Clientes.update(data, { where: {id:id}});
        console.log('user', user);
        
    res.json({
        user
    });
}

const BorrarCliente = async(req, res = response ) => {
    const { xid } = req.params;

    try {

        const cliente = await Clientes.update({cli_estado: 1}, {where: {id: xid}});     
       
        res.status(200).json(cliente);


    } catch (error) {
   
        console.log('error:', error);
        res.status(500).json({
            msg: 'Hable con el Administrador',
        });
    }
}


module.exports ={
    crearCliente,
    clientePaginado,
    clienteid,
    ActualizaClie,
    BorrarCliente
}