const mongoose = require('mongoose');

const Schema = mongoose.Schema

const journalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    entry: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('entry', journalSchema);