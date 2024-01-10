const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, path.join(__dirname, "../", "../public/images/users"))
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage});

const usersController = require('../controllers/usersController');
const validateRegister = require("../middlewares/registerMiddleware")




router.get("/register", usersController.register);
router.post("/register", upload.single("perfil"), validateRegister, usersController.store);

module.exports = router;