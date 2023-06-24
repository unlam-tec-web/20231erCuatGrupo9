const express = require('express');

const app = express();
let productos = ({
        id: 1,
        name: 'Dishonored',
        details: 'assets/img/dishonored.jpg',
        price: 45.6
    },
    {
        id: 2,
        name: 'Prey',
        details: 'assets/img/prey.jpg',
        price: 2689
    },
    {
        id: 3,
        name: 'Battlefield 1',
        details: 'assets/img/battlefield1.jpg',
        price: 2689
    },
    {
        id: 4,
        name: 'Doom',
        details: 'assets/img/doom.jpg',
        price: 2689
    },
    {
        id: 5,
        name: 'Far Cry ',
        details: 'assets/img/farcry.jpg',
        price: 2689
    },
    {
        id: 6,
        name: 'Hitman',
        details: 'assets/img/hitman.jpg',
        price: 2689
    },
    {
        id: 7,
        name: 'Horizon',
        details: 'assets/img/horizon.jpg',
        price: 2689
    },
    {
        id: 8,
        name: 'Medium',
        details: 'assets/img/medium.jpg',
        price: 30
    } );

let isLogin = () => false;

let logger = (req, res, next) => {
    console.log('Peticion de tipo: ', req.method );
    next();
}

let showIP = (req, res, next) => {
    console.log('IP: 127.0.0.1');
    next();
}; 


app.use((req, res, next) => {
    if(isLogin()){
        next();
    }else{
        res.send('No estas logeado');
    }
}, logger, showIP);

app.use(express.json());

app.get('/:user', (req, res) => {

    let usuario = req.params.user;
    res.json({
        productos
    });
});

app.post('/agregarProducto', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    let nombre = req.params.nombre;
    let detalles = req.params.detalles;
    let precio = req.params.precio;
    let id = req.params.id;
    let productoNew = ({
        id : id,
        name : nombre,
        details : detalles,
        price : precio
    })
    let newJson = agregarCampoAJSON(productos, nombre, productoNew);
    if(newJson){
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

app.get('/galeria', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    res.json(
        productos
    )
});

app.get('/test', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    res.json(
        'llego'
    )
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

function agregarCampoAJSON(jsonString, campo, datosProducto) {
    try {

        const obj = JSON.parse(jsonString);

        if (obj.hasOwnProperty(campo)) {
            console.log(`El campo "${campo}" ya existe en el objeto.`);
            return jsonString;
        }

        obj[campo] = datosProducto;

        const updatedJson = JSON.stringify(obj, null, 2);

        return updatedJson;
    } catch (err) {
        console.error('Error al convertir JSON:', err);
        return null;
    }
}


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

















