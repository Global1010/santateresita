const { response } = require("express");
const { Op } = require("sequelize");
const { Usuario, Productos, Categoria, Clientes} = require('../models');

const BuscarPermitido = [
    'usuarios',
    'productos',
    'role',
    'categoria',
    'clientes'
]

const BuscarUsuario = async( termino = '', res = response) => {
    if (!isNaN(termino)) {
              
        const usuario = await Usuario.findByPk(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });

    } else {
        
        // const usuario = await Usuario.findAll({ where: {usu_nombre: {[Op.like ]: `%${termino}%`} }});
        const usuario = await Usuario.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            usu_nombre: { 
                                [Op.like]: `%${termino}%` 
                            }
                        },
                        {
                            usu_email: {
                                [Op.like]: `%${termino}%`
                            }
                        }
                    ],
                    [Op.and]: { usu_estado: 1}
                }
            }
        )
           
        res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }
}

const BuscarProductos = async( termino = '', res = response) => {
    if (!isNaN(termino)) {
              
        const producto = await Productos.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            id: termino
                        },
                        {
                            pro_barra: termino
                        }
                    ],
                    [Op.and]: { pro_estado: 0}
                }
            });
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });

    } else {
        
        // const usuario = await Usuario.findAll({ where: {usu_nombre: {[Op.like ]: `%${termino}%`} }});
        const productos = await Productos.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            pro_descri: { 
                                [Op.like]: `%${termino}%` 
                            }
                        },
                        {
                            pro_aplica: {
                                [Op.like]: `%${termino}%`
                            }
                        }
                    ],
                    [Op.and]: { pro_estado: 0}
                }
            }
        )          
        res.json({
            results: ( productos ) ? [ productos ] : []
        });
    }
}

const BuscarCategoria = async( termino = '', res = response) => {
    if (!isNaN(termino)) {
              
        const categoria = await Categoria.findAll(
            {
                where: {
                    [Op.and]: [
                        {
                            id: termino
                        }
                    ],
                    [Op.and]: { cat_estado: 0}
                }
            });
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });

    } else {
        
        // const usuario = await Usuario.findAll({ where: {usu_nombre: {[Op.like ]: `%${termino}%`} }});
        const categorias = await Categoria.findAll(
            {
                where: {
                    [Op.and]: [
                        {
                            cat_descri: { 
                                [Op.like]: `%${termino}%` 
                            }
                        }
                    ],
                    [Op.and]: { cat_estado: 0}
                }
            }
        )          
        res.json({
            results: ( categorias ) ? [ categorias ] : []
        });
    }
}

const BuscarCliete = async( termino = '', res = response) => {
    if (!isNaN(termino)) {
        const cliente = await Clientes.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            id: termino
                        },
                        {
                            cli_cedula: termino
                        }
                    ],
                    [Op.and]: { cli_estado: 0}
                }
            });
        return res.json({
            results: ( cliente ) ? [ cliente ] : []
        });

    } else {
        
        // const usuario = await Usuario.findAll({ where: {usu_nombre: {[Op.like ]: `%${termino}%`} }});
        const clientes = await Clientes.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            cli_nombre: { 
                                [Op.like]: `%${termino}%` 
                            }
                        },
                        {
                            cli_apelli: { 
                                [Op.like]: `%${termino}%` 
                            }
                        },
                        {
                            cli_razon: { 
                                [Op.like]: `%${termino}%` 
                            }
                        }
                    ],
                    [Op.and]: { cli_estado: 0}
                }
            }
        )          
        res.json({
            results: ( clientes ) ? [ clientes ] : []
        });
    }
}

const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if( !BuscarPermitido.includes(coleccion)) {
        
        return res.status(400).json({
            msg: `Las Busquedas permitidas en la Db son: ${ BuscarPermitido }`
        })
    }
    
    
    switch (coleccion) {
        case  'usuarios':
            BuscarUsuario(termino, res);
        break;
        case 'productos':
            BuscarProductos(termino, res);
        break;
        case 'categoria':
            BuscarCategoria(termino, res);
        break;
        case 'categoria':
            BuscarCliete(termino, res);
        break;
        case 'clientes':
            BuscarCliete(termino, res);
        break;
        
        default:
            res.status(500).json({
                msg: 'Esta busqueda esta en proceso... hable con el administrador'
            })
    }

}



module.exports = {
    buscar
}