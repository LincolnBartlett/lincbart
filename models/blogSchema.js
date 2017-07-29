var mongoose    = require('mongoose');

var blogSchema = new mongoose.Schema({
    name: String,
    body: String,
    bodyBlurb: String,
    date: { type: Date, default: Date.now }/*,
    
    author:{
        id :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
    */
});

module.exports = mongoose.model('Blog', blogSchema);