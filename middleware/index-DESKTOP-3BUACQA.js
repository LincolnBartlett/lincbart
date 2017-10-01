var Blog = require('../models/blogSchema'),
    Pile = require('../models/pileSchema');


var middleware = {};

middleware.isMe = function(req, res, next){
    if(req.user.username === 'Lincoln Bartlett'){
        next();
    } else{
        res.redirect('back');
    }
}

middleware.checkBlogOwner = function(req, res, next){
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


middleware.checkPileOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Pile.findById(req.params.id, function(err, foundPile){
            if(err){
                res.redirect('/crud');
            }else{
                if(foundPile.author.id.equals(req.user._id) || (req.user.username === 'Lincoln Bartlett')){
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
middleware.isAlreadyLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/user/profile');
    }else{
        return next();   
    }
    
}
middleware.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
}

module.exports = middleware;