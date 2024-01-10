const fs = require('fs');
const path = require('path');
const  { uuid }  =  require( 'uuidv4' ) ;
const {setJson, getJson} = require("../utility/jsonMethod");
const { log } = require('console');
const {validationResult }= require("express-validator");

const controller = {
    register:(req,res)=>{
        res.render("register", {title:"REGISTRARSE"})
    },
    store:(req,res)=>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("register", {title: "REGISTRARSE", errors:errors.mapped(), old: req.body })
        }else{
            const file = req.file;
            const user= req.body;
            user.id = uuid();
           user.image = file ? file.filename : "default-image.png";
            const users = getJson("usersDataBase.json");
            console.log(user);
            users.push(user);
            setJson(users, "usersDataBase.json");
            res.redirect("/");
        }
        
    }
}

module.exports = controller;