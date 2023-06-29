const express = require('express');
var cors = require('cors')
const mysql = require('mysql');
const app = express();

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'taller2',
    port: 3306
});
app.use(cors())

let productos = [{
        id: 1,
        name: 'Dishonored',
        image: 'assets/img/dishonored.jpg',
        price: 45.6
    },
    {
        id: 2,
        name: 'Prey',
        image: 'assets/img/prey.jpg',
        price: 2689
    },
    {
        id: 3,
        name: 'Battlefield 1',
        image: 'assets/img/battlefield1.jpg',
        price: 2689
    },
    {
        id: 4,
        name: 'Doom',
        image: 'assets/img/doom.jpg',
        price: 2689
    },
    {
        id: 5,
        name: 'Far Cry ',
        image: 'assets/img/farcry.jpg',
        price: 2689
    },
    {
        id: 6,
        name: 'Hitman',
        image: 'assets/img/hitman.jpg',
        price: 2689
    },
    {
        id: 7,
        name: 'Horizon',
        image: 'assets/img/horizon.jpg',
        price: 2689
    },
    {
        id: 8,
        name: 'Medium',
        image: 'assets/img/medium.jpg',
        price: 30
    } ];

let isLogin = () => false;

let logger = (req, res, next) => {
    console.log('Peticion de tipo: ', req.method );
    next();
}

let showIP = (req, res, next) => {
    console.log('IP: 127.0.0.1');
    next();
}; 


/*app.use((req, res, next) => {
    if(isLogin()){
        next();
    }else{
        res.send('No estas logeado');
    }
}, logger, showIP);*/

app.use(express.json());


/*app.get('/:user', (req, res) => {

    let usuario = req.params.user;
    res.json({
        productos
    });
});*/

app.post('/agregarProducto', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    let nombre = req.body.nombre;
    let imagen = req.body.imagen;
    let precio = req.body.precio;
    // let id = req.params.id;
    // let productoNew = ({
    //     nombre : nombre,
    //     imagen : imagen,
    //     precio : precio
    // })
    // console.log(productoNew);
    // let newJson = agregarCampoAJSON(productos, nombre, productoNew);
    console.log(nombre)
    console.log(precio)
    console.log(imagen)
    let resultado = insertarProducto(nombre, precio, imagen);
    if(resultado){
        res.json(
            'Producto agregado con Exito'
        )
    } else {
        res.json(
            'Producto Existente!'
        )
    }
});

app.post('/comprar', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    let id = req.params.id;
    let producto = getProductoData(productos, id);
    res.json(
        'Compra realizada con Exito'
    )
});

// app.get('/galeria2', (req, res) => {
//     console.log("JSON:" + JSON.stringify(req.body));
//     res.json(
//         productos
//     )
// });

app.get('/galeria', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    obtenerProductos()
        .then((jsonResults) => {
            console.log(jsonResults);
            res.json(
               jsonResults
            )
        })
        .catch((error) => {
            res.json('error')
        });
    // let response = obtenerProductos();
    // console.log(JSON.stringify(response));
    // res.json(
    //    'ok'
    // )
});


app.delete('/borrarProducto', (req, res) => {
    let productoEliminar = req.params.producto;
    const jsonActualizado = eliminarCampoDeJSON(productos, productoEliminar);
    if (jsonActualizado) {
        productos = jsonActualizado.toString();
    }
    res.send('Producto Eliminado con exito');
});


app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000!')
});


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

// function agregarCampoAJSON(jsonString, campo, datosProducto) {
//     try {
//
//         const obj = JSON.parse(jsonString);
//
//         if (obj.hasOwnProperty(campo)) {
//             console.log(`El campo "${campo}" ya existe en el objeto.`);
//             return jsonString;
//         }
//
//         obj[campo] = datosProducto;
//
//         const updatedJson = JSON.stringify(obj, null, 2);
//
//         return updatedJson;
//     } catch (err) {
//         console.error('Error al convertir JSON:', err);
//         return null;
//     }
// }


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


const insertarProducto = (nombre, precio, imagen) => {
    // const { nombre, precio, imagen } = producto;
    const query = `INSERT INTO product (name, price, image) VALUES (?, ?, ?)`;
    console.log(nombre)
    console.log(precio)
    console.log(imagen)
    connection.query(query, [nombre, precio, imagen], (error, results) => {
        if (error) {
            console.error('Error al insertar el producto:', error);
            return false;
        }
        console.log('Producto insertado correctamente');
        return true;
    });
};

// Método para actualizar un producto existente por su ID
const actualizarProducto = (id, producto) => {
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

//Falta adaptar
const eliminarProducto = (id) => {
    const query = `DELETE FROM producto WHERE id = ?`;

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar el producto:', error);
            return;
        }
        console.log('Producto eliminado correctamente');
    });
};

//este es de prueba
const obtenerProductos2 = () => {
    const query = `SELECT * FROM producto`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los productos:', error);
            return results;
        }
        console.log('Productos:');
        console.log(results);
    });
};

const obtenerProductos = () => {
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
