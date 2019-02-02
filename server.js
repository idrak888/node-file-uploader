const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {mongoose} = require('./db/mongoose');
const {Image} = require('./db/images');

var app = express();

var port = process.env.PORT || 3000;

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

app.listen(port, () => {
	console.log('Started on port ' + port);
});