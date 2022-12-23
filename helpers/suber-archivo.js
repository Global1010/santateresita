
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const suberArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {


    return new Promise( (resolve, reject ) => {

        const { archivo } = files;
        const quirarNombre = archivo.name.split('.');
        const extension = quirarNombre[ quirarNombre.length -1 ]
        
        // validar la extension
        
        if (!extensionesValidas.includes(extension )) {

            return reject(`La extensón ${ extension } no es permitida - ${ extensionesValidas}`);
        }
        
        const nombreTemp = uuidv4()+'.'+extension;

        
        const uploadPath = path.join(__dirname,'../uploads/',carpeta, nombreTemp);
        
        archivo.mv(uploadPath, function(err) {
          if (err) {
            return reject(err);
          }
        
           resolve(nombreTemp);
        });
    });

}




module.exports = {
    suberArchivo
}