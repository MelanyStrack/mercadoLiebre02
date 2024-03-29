const fs = require('fs');
const path = require('path');
const {setJson, getJson} = require("../utility/jsonMethod")

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = getJson("productsDataBase.json")


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	index: (req, res) => {
		const products = getJson("productsDataBase.json")
		res.render("index", {title:"Home", products, toThousand})
	},
	search: (req, res) => {
		const busqueda = req.query.keywords
		const products = getJson("productsDataBase.json");
		const encontrado = products.filter(product =>{
			 
			return product.name.toLowerCase().includes(busqueda.toLowerCase())
			
		})
		res.render("results", {encontrado, toThousand, busqueda})
	},
};

module.exports = controller;
