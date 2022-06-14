const jwt = require('jsonwebtoken');


const gtoken =( uid = ' ') => {

    return new Promise( (resolve, reject ) => {
        const payload = { uid };

        jwt.sign( payload, process.env.LLAVEENCRIPTADOSICE, {
            expiresIn: '5d'
        }, (err, token ) => {
            if( err) {
                console.log('err');
                reject('No se pudo generar el token')
            } else {
                resolve( token );
            }
        });
})

}


module.exports = {
    gtoken
}