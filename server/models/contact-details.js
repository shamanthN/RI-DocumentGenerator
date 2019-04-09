const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
	siteId:String,
    name:String,
    role:String,
    organization:String,
    email: String,
    phone: String,
    remark:String,
    status:String
});

module.exports = mongoose.model('Contacts', contactsSchema);

