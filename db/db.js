const mysql = require("mysql2");

//conexion a bbdd//
const connection =mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "panaderia"

});

connection.connect((error) => {
if(error){
    return console.error(error);
}
console.log("Estamos conectados a la Base de Datos Panaderia");
});

//exportar del modulo la funcion connection

module.exports = connection;
