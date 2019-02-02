const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {mongoose} = require('./db/mongoose');
const {Image} = require('./db/images');

var app = express();
app.use('/public', express.static('public'));

var port = process.env.PORT || 3000;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage
}).single('myImage');

app.post('/upload', upload, (req, res) => {
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

app.get('/uploads', (req, res) => {
	Image.find().then(imgs => {
		res.send(imgs);
	});
});

app.delete('/uploads', (req, res) => {
	Image.find().remove().then(doc => {
		res.send(doc);
	});	
});

app.listen(port, () => {
	console.log('Started on port ' + port);
});
