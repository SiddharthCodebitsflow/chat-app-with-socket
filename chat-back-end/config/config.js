const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/chatApp';
mongoose.connect(url)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });