const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const { body, checkSchema, validationResult } = require('express-validator');


/*cognito*/
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const jwt_decode = require('jwt-decode');
const config = require("./credenciales.json");

const poolData = {
    UserPoolId: config.UserPoolId, // Your user pool id here    
    ClientId: config.ClientId // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
let cognitoAttributeList = [];


const attributes = (key, value) => {
    return {
        Name: key,
        Value: value
    }
};

function setCognitoAttributeList(email, agent) {
    let attributeList = [];
    attributeList.push(attributes('email', email));
    attributeList.forEach(element => {
        cognitoAttributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(element));
    });
}

function getCognitoAttributeList() {
    return cognitoAttributeList;
}

function getCognitoUser(email) {
    const userData = {
        Username: email,
        Pool: getUserPool()
    };
    return new AmazonCognitoIdentity.CognitoUser(userData);
}

function getUserPool() {
    return new AmazonCognitoIdentity.CognitoUserPool(poolData);
}

function getAuthDetails(email, password) {
    var authenticationData = {
        Username: email,
        Password: password,
    };
    return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
}

function initAWS(region = process.env.AWS_COGNITO_REGION, identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID) {
    AWS.config.region = region; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
    });
}

function decodeJWTToken(token) {
    const { email, exp, auth_time, token_use, sub } = jwt_decode(token.idToken);
    return { token, email, exp, uid: sub, auth_time, token_use };
}
/* End cognito*/

const esquemaLogin = {
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "La contraseña debe contener al menos una letra minuscula, una mayuscula, un numero y mas de 8 caracteres",
    },
    mail: {
        isEmail: {
            errorMessage: 'El email no es valido',
        },
        normalizeEmail: true
    }
}

app.post("/login", checkSchema(esquemaLogin), (req, res) => {

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

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
    });

    getCognitoUser(username).authenticateUser(authenticationDetails, {
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
    checkSchema(esquemaLogin),
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

        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "given_name", Value: given_name }));

        userPool.signUp(username, password, attributeList, null, (error, result) => {

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

        getCognitoUser(username).confirmRegistration(code, true, (error, result) => {
            if (error) {
                res.status(400).json(error);
            }
            else {
                res.status(200).json(result);
            }
        });
    });


app.listen(config.port, () => {
    console.log(`Escuchando en el puerto ${config.port}!`);
});
