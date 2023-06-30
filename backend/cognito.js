const AWS = require('aws-sdk');
const jwt_decode = require('jwt-decode');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
let cognitoAttributeList = [];
const config = require("./credenciales.json");

const poolData = {
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId
};

const attributes = (key, value) => {
    return {
        Name: key,
        Value: value
    }
};

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

function setCognitoAttributeList(email, given_name) {
    let attributeList = [];
    attributeList.push(attributes('email', email));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "given_name", Value: given_name }));
    return attributeList;
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

module.exports = {
    initAWS,
    getCognitoAttributeList,
    getUserPool,
    getCognitoUser,
    setCognitoAttributeList,
    getAuthDetails,
    decodeJWTToken,
    esquemaLogin
}