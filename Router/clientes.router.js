//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../Controller/clientes.controller");


//// MULTER ////
const multer = require ("multer");
const path = require ("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads'); // carpeta en el proyecto
},
filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname)); 
} ,

});


//const upload = multer({storage: "storage"});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes =/jpg|jpeg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimeType && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
        limits: {fileSize: 1024 * 1024 * 1}, //aprox 1Mb
    
});







//METODO GET
//para todos los clientes
router.get('/',controller.getClientes);

//METODO GET BY ID
router.get('/:id',controller.getClienteById);

//METODO POST
router.post('/', upload.single('imagen'), controller.createCliente);

// METODO PUT 
router.put('/:id', controller.updateCliente);

//METODO DELETE
router.delete('/:id', controller.deleteCliente);

//Exporta las rutas
module.exports= router;