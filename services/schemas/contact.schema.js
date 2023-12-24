const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 22,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        minlength: 8,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,

    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',}
    
},   
{ versionKey: false, timestamps: true }
)

const Contact = mongoose.model('contact', contact);

module.exports = Contact;