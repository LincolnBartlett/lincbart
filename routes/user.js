var express          = require('express'),
    router           = express.Router(),
    User             = require('../models/userSchema'),
    mongoose         = require('mongoose'),
    passport         = require('passport'),
    middleware       = require('../middleware');

    
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
                res.redirect(' /user/profile');
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

router.get('/profile', function(req, res){
    res.redirect('/user/profile/'+ req.user._id);
});

//SEE
router.get('/profile/:id', function(req, res){
    User.findById(req.params.id, function(err, foundProfile){
        res.render('./user/userprofile',{foundProfile: foundProfile});
    });
    
});




module.exports = router;