var mongoose = require('mongoose');

var pileSchema = new mongoose.Schema({
    name: String,
    message: String,
    author:{
        id :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});

module.exports = mongoose.model('Pile', pileSchema);