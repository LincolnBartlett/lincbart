var Blog = require('../models/blogSchema');


var middlewareObj = {};

middlewareObj.checkBlogOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err){
                res.redirect('/blog');
            }else{
                if(foundBlog.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        });
    }else{
        res.redirect('back');
    }
    }


//Check Login Status
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
}

module.exports = middlewareObj;