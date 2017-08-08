var mongoose = require('mongoose');

var pileSchema = new mongoose.Schema({
    body: String,
    date: { type: Date, default: Date.now },  
    author:{
        id :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('Pile', pileSchema);