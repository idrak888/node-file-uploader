const mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
	src: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = {
	Image
}