const {body} = require("express-validator");

const validateRegister=[
    body("name").notEmpty().withMessage("Este campo es obligatorio").bail().isLength({min:3, max:15}).withMessage("El nombre debe tener un mínimo de 3 caracteres y un máximo de 15"),
    body("surname").notEmpty().withMessage("Este campo es obligatorio").bail().isLength({min:3, max:20}).withMessage("El apellido debe tener un mínimo de 3 caracteres y un máximo de 25"),
    body("userName").notEmpty().withMessage("Este campo es obligatorio").bail().isLength({min:3, max:20}).withMessage("El usuario debe tener un mínimo de 3 caracteres y un máximo de 25"),
    body("email").notEmpty().withMessage("Este campo es obligatorio").bail().isEmail().withMessage("Ingrese un mail válido"),
    body("address").notEmpty().withMessage("Este campo es obligatorio"),
    body("password").notEmpty().withMessage("Este campo es obligatorio").bail().isLength({min:3, max:15}).withMessage("La contraseña debe tener un mínimo de 3 caracteres y un máximo de 15"),
]

module.exports = validateRegister;