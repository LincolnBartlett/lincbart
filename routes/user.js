var express                   = require('express'),
    router                    = express.Router(),
    User                      = require('../models/userSchema'),
    mongoose                  = require('mongoose'),
    passport                  = require('passport'),
    middleware                = require('../middleware'),
    Blog                      = require('../models/blogSchema'),
    newComment                = require('../models/commentSchema'),
    Pile                      = require('../models/pileSchema');

    
//REGISTER
//SHOW
router.get('/register', function(req, res){
    res.render('./user/register');
});

//CREATE
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render('./user/register');
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/user/profile');
            });
        }
    });
});

//LOGIN
router.get('/login',middleware.isAlreadyLoggedIn, function(req, res){
    res.render('./user/login');
});

router.post('/login', passport.authenticate('local',{
    successRedirect:'back',
    failureRedirect: '/user/login'
}) , function(req, res){});

//LOGOUT

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/front');
});

//PROFILES

router.get('/profile',middleware.isLoggedIn, function(req, res){
    res.redirect('/user/profile/'+ req.user._id);
});

//SEE
router.get('/profile/:id', middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundProfile){
        if(err){
            res.redirect('back');
        }else{
            newComment.find({"author.id": foundProfile._id}).find(function(err, foundComments){
                Pile.find({"author.id": foundProfile._id}).find(function(err, foundPiles){
                    Blog.find({}).find(function(err, foundBlogs){
                        res.render('./user/userprofile',{foundProfile: foundProfile,foundComments:foundComments,foundPiles:foundPiles,foundBlogs:foundBlogs});
                    });
                });
            });
        }
    });    
});


//SEE ALL
router.get('/all', function(req, res){
    User.find({}, function(err, allProfiles){
        res.render('./user/all',{allProfiles:allProfiles});
    });
});

//DELETE
router.delete('/:id', middleware.isMe, function(req, res){
    User.findByIdAndRemove(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            res.redirect('back');
        }
    });
});



module.exports = router;