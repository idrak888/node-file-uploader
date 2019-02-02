const express = require('express');
const hbs = require('handlebars');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {mongoose} = require('./db/mongoose');
const {Image} = require('./db/images');

var app = express();

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage,
	limits: {
		fileSize: 1000000
	}
}).single('myImage');

app.set('view engine', 'hbs');
app.use(express.static('./public'));

app.post('/', upload, (req, res) => {
	console.log(req.file);
	
	const newImage = new Image ({
		src: req.file.path
	});

	newImage.save().then(img => {
		res.send(img);
	}).catch(e => {
		res.send(e);
	});
});

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});