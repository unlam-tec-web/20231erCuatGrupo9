const express = require('express');
var cors = require('cors');
const app = express();
const { query, param, body, checkSchema, validationResult } = require('express-validator');
const config = require("./credenciales.json");
const awsConfig = require('./cognito.js');
const mysql = require("./mysql.js");

app.use(cors())
app.use(express.json());

/** COGNITO */

app.post("/login",
    checkSchema(awsConfig.mail_validate),
    checkSchema(awsConfig.password_validate),
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

        var authenticationDetails = awsConfig.getAuthDetails(username, password);

        awsConfig.getCognitoUser(username).authenticateUser(authenticationDetails, {
            onSuccess: function (result) {

                res.status(200).json(
                    {
                        result
                    }
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
    checkSchema(awsConfig.mail_validate),
    checkSchema(awsConfig.given_name_validate),
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

        var attributeList = awsConfig.setCognitoAttributeList(username, given_name);


        awsConfig.getUserPool().signUp(username, password, attributeList, null, (error, result) => {

            if (error) {
                res.status(400).json(error);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

app.post("/verify",
    //checkSchema(awsConfig.mail_validate.mail),
    checkSchema(awsConfig.code_validate),
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

        awsConfig.getCognitoUser(username).confirmRegistration(code, true, (error, result) => {
            if (error) {
                res.status(400).json(error);
            }
            else {
                res.status(200).json(result);
            }
        });
    });


app.post("/resetPassword",
    checkSchema(awsConfig.password_validate),
    checkSchema(awsConfig.new_password_validate),
    checkSchema(awsConfig.mail_validate),
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
        var newpassword = req.body.newpassword;

        var cognitoUser = awsConfig.getCognitoUser(username);

        cognitoUser.authenticateUser(awsConfig.getAuthDetails(username, password), {
            onSuccess: function (resultado) {
                cognitoUser.changePassword(password, newpassword, (error, result) => {//Aca hay un error por algun motivo
                    if (error) {
                        res.status(400).json({
                            error,
                            "mensaje": "No se pudo cambiar la clave"
                        });
                    } else {
                        res.status(200).json(result);
                    }
                });
            },
            onFailure: function (error) {
                res.status(400).json({
                    error,
                    "mensaje": "Usuario o contraseña incorrecta"
                });
            },
        });
    });

/** END COGNITO */

/** PRODUCTOS */

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

app.post('/agregarProducto',
    body("nombre").isLength({ min: 3 }).withMessage("El nombre debe contener almenos 3 caracteres"),
    body("precio").isNumeric().withMessage("El precio debe ser un numero"),
    body("imagen").isLength({ min: 3 }).withMessage("El nombre debe contener almenos 3 caracteres"),
    (req, res) => {

        const errors = validationResult(req);

        //Validacion de datos
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        mysql.insertarProducto(req.body.nombre, req.body.precio, req.body.imagen)
            .then((jsonResults) => {
                res.status(200).json(
                    'Producto agregado con Exito'
                )
            })
            .catch((error) => {
                res.status(400).json(
                    'Error al agregar el producto'
                )
            });
    });

app.delete('/borrarProducto',
    query("id").isNumeric().withMessage("El id debe ser un numero"),
    (req, res) => {

        const errors = validationResult(req);

        //Validacion de datos
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        mysql.eliminarProducto(req.query.id).then((jsonResults) => {
            res.status(200).json(
                'Producto Eliminado con exito'
            )
        }).catch((error) => {
            res.status(400).json(
                'Error al eliminar el producto'
            )
        });
    });

/** PRODUCTOS */

app.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port}!`);
});
