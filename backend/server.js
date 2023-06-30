const express = require('express');
var cors = require('cors');
const app = express();
const { body, checkSchema, validationResult } = require('express-validator');
const config = require("./credenciales.json");
const AwsConfig = require('./cognito.js');
const mysql = require("./mysql.js");

app.use(cors())
app.use(express.json());

app.post("/login", checkSchema(AwsConfig.esquemaLogin), (req, res) => {

    const errors = validationResult(req);

    //Validacion de datos
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    //TODO: filter vars
    var username = req.body.mail;
    var password = req.body.password;

    var authenticationDetails = AwsConfig.getAuthDetails(username, password);

    AwsConfig.getCognitoUser(username).authenticateUser(authenticationDetails, {
        onSuccess: function (result) {

            res.json(
                access_token = result.getAccessToken().getJwtToken(),
                id_token = result.getIdToken().getJwtToken(),
                refresh_token = result.getRefreshToken().getToken()
            );
        },
        onFailure: function (error) {
            switch (error.code) {
                case "NotAuthorizedException":
                    res.status(401).json(error = "Usuario no existe o contraseña incorrecta");
                    break;
                case "UserNotConfirmedException":
                    res.status(401).json(error = "Usuario no confirmado");
                    break;
                default:
                    res.status(400).json(error);
            }
        },
    });
});

app.post("/signup",
    body("given_name").isLength({ min: 3 }).withMessage("El nombre debe contener almenos 3 caracteres"),
    checkSchema(AwsConfig.esquemaLogin),
    (req, res) => {

        const errors = validationResult(req);

        //Validacion de datos
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        var username = req.body.mail;
        var password = req.body.password;
        var given_name = req.body.given_name;

        var attributeList = AwsConfig.setCognitoAttributeList(username, given_name);


        AwsConfig.getUserPool().signUp(username, password, attributeList, null, (error, result) => {

            if (error) {
                res.status(400).json(error);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

app.post("/verify",
    body("mail").isEmail().normalizeEmail(),
    body("code").isLength({ min: 6, max: 6 }).withMessage("Codigo incorrecto"),
    (req, res) => {

        const errors = validationResult(req);

        //Validacion de datos
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        var username = req.body.mail;
        var code = req.body.code;

        var params = {
            ClientId: config.ClientId,
            ConfirmationCode: code,
            Username: username
        };

        AwsConfig.getCognitoUser(username).confirmRegistration(code, true, (error, result) => {
            if (error) {
                res.status(400).json(error);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

app.get('/galeria', (req, res) => {
    mysql.obtenerProductos()
        .then((jsonResults) => {
            res.json(
                jsonResults
            )
        })
        .catch((error) => {
            res.json('error')
        });
});


app.post('/comprar', (req, res) => {
    let id = req.params.id;
    let producto = getProductoData(productos, id);
    res.json(
        'Compra realizada con Exito'
    )
});

app.post('/agregarProducto', (req, res) => {
    let nombre = req.body.nombre;
    let imagen = req.body.imagen;
    let precio = req.body.precio;
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

app.delete('/borrarProducto', (req, res) => {
    let productoEliminar = req.params.producto;
    const jsonActualizado = mysql.eliminarCampoDeJSON(productos, productoEliminar);
    if (jsonActualizado) {
        productos = jsonActualizado.toString();
    }
    res.send('Producto Eliminado con exito');
});

app.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port}!`);
});