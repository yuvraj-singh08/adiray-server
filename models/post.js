const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: String,
    title: String,
    description: String,
    details: String,
    imageUrl: String,
    // other fields as needed
},
{
    timestamps: true, 
});

module.exports = mongoose.model('Post', postSchema);
