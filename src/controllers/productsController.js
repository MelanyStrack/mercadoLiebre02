const fs = require('fs');
const path = require('path');
const  { uuid }  =  require( 'uuidv4' ) ;
const {setJson, getJson} = require("../utility/jsonMethod");
const { log } = require('console');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	// Root - Show all products
	productsView: (req, res) => {
		const products = getJson("productsDataBase.json")
		res.render ("products", {title:"Todos los productos", products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = req.params.id
		const products = getJson("productsDataBase.json")
		const product = products.find(producto => producto.id == id) 
		const calc = product.price - ((product.price * product.discount) / 100)
		res.render("detail",{title:product.name, product, calc, toThousand})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form",{title:"Creando producto"})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const file = req.file;
		const {name, price, discount, category, description}=req.body
		const id = uuid();
		const products = getJson("productsDataBase.json");
		const product ={
			id,
			name: name.trim(),
			price:+price,
			discount: +discount,
			category,
			description: description.trim(),
			image: file ? file.filename : "default-image.png"
		}
		products.push(product);
		setJson(products, "productsDataBase.json")
		res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params
		const products = getJson("productsDataBase.json")
		const product = products.find(producto => producto.id == id)
		res.render("product-edit-form", {title:`Editar producto: ${product.name}`, product})
	},
	// Update - Method to update
	update: (req, res) => {
		const {id} = req.params ;
		const {name, description, price, discount,image,category}= req.body;
		const products = getJson("productsDataBase.json");
		const arrayNuevo = products.map(product =>{
			if (product.id == id) {
				return{
					id,
					name: name.trim(),
					description: description.trim(),
					price: +price,
					discount: +discount,
					image: image ? image : product.image,
					category,
				}
			}
			return product
		})
		setJson(arrayNuevo, "productsDataBase.json")
		res.redirect(`/products/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params
		const products = getJson("productsDataBase.json");
		const newList = products.filter(product => product.id != id)
		setJson(newList, "productsDataBase.json")
		res.redirect(`/products`)
	}
};

module.exports = controller;