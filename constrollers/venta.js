const { response, request }= require('express');
const Ventadet = require('../models/vendet');
const Venta = require('../models/venta');





const nuevaVenta = async(req= request , res = response) => {
    
    const ven_vende = req.usuario.id;
    const data = req.body;
    const {ven_cliente,ven_tipcon,ven_fecha,ven_tolven} = data['1'];
    
    try { 

        const cabece =  {
            ven_cliente,
            ven_tipcon,
            ven_fecha,
            ven_tolven,
            ven_vende
        }
       
        const nventa = new Venta(cabece);
        await nventa.save();
 
   
        var datav = [];
        for (var i = 0; i < data['0'].detalle.length; i++) {
            
            var dventa = [
                { 
                'vdt_nro': nventa.id,
                'vdt_produc': data['0'].detalle[i].pid,
                'vdt_canti':  data['0'].detalle[i].pro_cantidad,
                'vdt_precio':  data['0'].detalle[i]. pro_preven,
                'vdt_tiva': data['0'].detalle[i].pro_tiva,
                'vdt_ival': data['0'].detalle[i].pro_ival,
                'vdt_costo': data['0'].detalle[i]. pro_precos
            }
            ]
        datav.push(...dventa);
        }
        await Ventadet.bulkCreate(datav);
          
        res.json(nventa);
    
        } catch (error) {
            console.log('error',error);
            res.status(400).json('Información no Válida');
        }
}


module.exports= {
    nuevaVenta
}