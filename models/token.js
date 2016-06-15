var mongoose = require('mongoose');

var token = function () {

    var token = mongoose.Schema({
        userId: { type: String, unique: true,required: true },
        token: { type: String, required: true }
    });

    return mongoose.model('Token', token);
}

module.exports = new token();