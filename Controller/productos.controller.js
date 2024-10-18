//controlador del modulo//
const db =require("../db/db");

//METODO GET//

//para todos los productos
const allProducts =(req,res) =>{
    const sql="SELECT * FROM productos";
    db.query(sql,(error,rows )=> {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    });
};

//para un producto
const showProducts = (req,res) => {
    const{id} = req.params;
    const sql="SELECT * FROM productos WHERE id = ?";
    db.query(sql,[id],(error,rows )=> {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length ==0){
            return res.status(400).send({error :"ERROR: No existe el producto requerido"});
        };

        res.json(rows[0]); //me muestra el elemento en la posicion cero si existe
    });

};


  //METODO POST///
const storeProducts = (req, res) => {
    const {nombre, descripcion, precio, categoria, disponible, fecha} = req.body;
    const sql = "INSERT INTO productos (nombre, descripcion, precio, categoria, disponible, fecha) VALUES (?,?,?,?,?,?)";
    db.query(sql,[nombre, descripcion, precio, categoria, disponible, fecha], (error, result) => {
        console.log(result);
        if(error){return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
    }
    const producto = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
    res.status(201).json(producto); // muestra creado con exito el elemento
});     

};


//// METODO PUT  ////
const updateProductos = (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, precio, categoria, disponible, fecha} = req.body;
    const sql ="UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, disponible = ? , fecha = ?  WHERE id = ?";
    db.query(sql,[nombre, descripcion, precio, categoria, disponible, fecha], (error, result) => {
        console.log(result);
        if (error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El producto a modificar no existe"});
        };
        
        const producto = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(producto); // mostrar el elemento que existe
    });     
};


//// METODO DELETE ////
const destroyProducto = (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql,[id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
                    }
                    if(result.affectedRows == 0){
                        return res.status(404).send({error : "ERROR: El producto a borrar no existe"});
                    };
                    res.json({mensaje : "Producto eliminado"});
                }); 
            };




//exportar todas las funciones del modulo
module.exports={ 
    allProducts, showProducts, destroyProducto, updateProductos, storeProducts

};