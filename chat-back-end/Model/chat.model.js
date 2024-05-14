const mongoose = require('mongoose');

const chatShema = mongoose.Schema({
    user_id: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});
module.exports = mongoose.model('Chat', chatShema);