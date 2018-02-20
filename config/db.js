const mongoose = require('mongoose');

// Map global promises

mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(
        "mongodb://jose:sabado123@ds041678.mlab.com:41678/pusherpoll"
    ).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));