const mysql = require('mysql');
const config = require("./credenciales.json");
var connection = mysql.createConnection(config.mysqlConectionData);

function insertarProducto(nombre, precio, imagen) {
    // const { nombre, precio, imagen } = producto;
    const query = `INSERT INTO product (name, price, image) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        connection.query(query, [nombre, precio, imagen], (error, results) => {
            if (error) {
                console.error('Error al obtener los productos:', error);
                reject(error);
            } else {
                console.log('Productos:');
                console.log(results);
                resolve(JSON.parse(JSON.stringify(results)))
            }
        });
    });
};

// Método para actualizar un producto existente por su ID
function actualizarProducto(id, producto) {
    const { nombre, precio, imagen } = producto;
    const query = `UPDATE product SET name = ?, price = ?, image = ? WHERE id = ?`;

    connection.query(query, [nombre, precio, imagen, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar el producto:', error);
            return;
        }
        console.log('Producto actualizado correctamente');
    });
};


function eliminarProducto(id) {
    const query = `DELETE FROM product WHERE id = ?`;
    return new Promise((resolve, reject) => {
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

function obtenerProductos() {
    const query = `SELECT * FROM product`;

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error al obtener los productos:', error);
                reject(error);
            } else {
                console.log('Productos:');
                console.log(results);
                resolve(JSON.parse(JSON.stringify(results)))

            }
        });
    });
};

function getProductoData(jsonString, campo) {
    try {
        const obj = JSON.parse(jsonString);

        if (obj.hasOwnProperty(campo)) {
            return obj[campo];
        } else {
            console.log(`El campo "${campo}" no existe en el objeto.`);
            return null;
        }
    } catch (err) {
        console.error('Error al convertir JSON:', err);
        return null;
    }
}

function eliminarCampoDeJSON(jsonString, campo) {
    try {

        const obj = JSON.parse(jsonString);

        if (obj.hasOwnProperty(campo)) {

            delete obj[campo];
        } else {
            console.log(`El campo "${campo}" no existe en el objeto.`);
        }

        const updatedJson = JSON.stringify(obj, null, 2);

        return updatedJson;
    } catch (err) {
        console.error('Error al convertir json:', err);
        return null;
    }
}

module.exports = {
    insertarProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto,
    getProductoData,
    eliminarCampoDeJSON
}