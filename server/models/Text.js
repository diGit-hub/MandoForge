const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required']
    },

    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },

    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
    },

    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
},  {
    timestamps: true
    }
);

const Text = mongoose.model('Text', textSchema);

module.exports = Text;