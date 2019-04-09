const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
   // siteId:String,
    sid:String,
    name:String,
    city:String,
    state: String,
    country: String
});

module.exports = mongoose.model('Site', siteSchema);

