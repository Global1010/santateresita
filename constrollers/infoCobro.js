const { response } = require("express");
const { } = require('../models');


const InfoCobro = async(req, res = response ) => {
      



    res.status(200).json({
        msg: "Informe de cobro"
    });

}


module.exports ={
    InfoCobro
}