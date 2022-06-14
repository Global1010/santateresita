const { response } = require("express");



const esAdmin = (req, res = response, next ) => {

    if (!req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token primero'
        });
    }
const {usu_cargo, usu_nombre} = req.usuario;

//console.log('req.usuario----------', req.usuario.usu_cargo);
    if (usu_cargo !=='ADMIN_ROL') {
        return res.status(401).json({
            msg: `${usu_nombre} : no esta autorizado para esta accion`
        });
    }

    next();
}
const tieneRol = (...roles ) =>  {

    return (req, res = response, next ) => {
        const {usu_cargo, usu_nombre} = req.usuario;
       
        if (!req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin validar el token primero'
            });
        }
        if (!roles.includes( usu_cargo)) {
            return res.status(401).json({
                msg: `${usu_nombre} : No esta Autorizado para esta Accion`
            });
        }
       
        next();
    }

}



module.exports = {
    esAdmin,
    tieneRol
}