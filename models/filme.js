const mongoose = require('mongoose')

const filmeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    author: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Filme', filmeSchema)