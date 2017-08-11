var express          = require('express'),
    router           = express.Router(),
    Pile             = require('../models/pileSchema'),
    mongoose         = require('mongoose'),
    middleware       = require('../middleware'),
    newComment       = require('../models/commentSchema'),
    User             = require('../models/userSchema');

//INDEX
router.get('/', function(req, res){
    res.redirect('crud/pile/0'); 
});

//PAGES

router.get('/pile/:id', function(req, res){
    User.find({}, function(err, allProfiles){      
        Pile.find({}).populate('comments').exec(function(err, allPiles){
            if(err){
                console.log(err);
            }else{
            var page = Number(req.params.id);
            var displaynum = 5;
            var pagecount = page * displaynum;
            var displaystart= allPiles.length - pagecount;
            var displayend= (displaystart) - displaynum;
            var displaypiles= [];
                if(displayend >= 0){
                    for(var i = displaystart; i > displayend ; i--){
                        displaypiles.push(allPiles[i - 1]);
                    }
                    res.render('crud/pile',{allPiles:displaypiles,pagenum:page, allProfiles:allProfiles});

                }else if(displayend < 0 && displaystart > 0){
                    for(var i = displaystart; i > 0; i--){
                        displaypiles.push(allPiles[i - 1]);
                    }
                    res.render('crud/pile',{allPiles:displaypiles, pagenum:page, allProfiles:allProfiles});

                }else{
                    res.redirect('/crud');
                }
            }
        });
    });
});

//NEW
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('crud/new');
});

//CREATE
router.post('/', middleware.isLoggedIn, function(req, res){
    var name= req.body.pile.name;
    var body= req.body.pile.body;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newPile = {name: name, body: body, author:author};
    Pile.create(newPile, function(err, newPile){
        if(err){
            res.render('pile/new');
        } else {
            res.redirect('/crud');
        }
    });
});

//SHOW
router.get('/:id', function(req, res){
    Pile.findById(req.params.id).populate('comments').exec(function(err, foundPile){
        if(err){
            res.redirect('/crud');
        }else{
            res.render('crud/show', {foundPile: foundPile});
        }
    });
});

//EDIT
router.get('/:id/edit', middleware.checkPileOwner, function(req, res){
    Pile.findById(req.params.id, function(err, foundPile){
        if(err){
            res.redirect('/crud');
        }else{
            res.render('crud/edit', {foundPile: foundPile});
        }
    });
});


//UPDATE
router.put('/:id', middleware.checkPileOwner, function(req, res){
    Pile.findByIdAndUpdate(req.params.id, req.body.pile, function(err,foundPile){
        if(err){
            res.redirect('/crud');
        }else{
            res.redirect('/crud');
        }
    });
});

//DELETE
router.delete('/:id', middleware.checkPileOwner, function(req, res){
    Pile.findByIdAndRemove(req.params.id, function(err, foundPile){
        if(err){
            console.log(err);
        }else{
            res.redirect('/crud/pile');
        }
    });
});




//COMMENT ROUTES
//NEW
router.get('/:id/comment/new', function(req, res){
    Pile.findById(req.params.id, function(err, foundPile){
        if(err){
            console.log(err);
        }else{
            res.render('crud/comment',{foundPile: foundPile, id: req.params.id});  
        }
    });
    
});

//CREATE
router.post('/:id/comment', middleware.isLoggedIn, function(req, res){
    Pile.findById(req.params.id, function(err, foundPile){   
        if(err){
            console.log(err);
        }else{
            newComment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;       
                    comment.save();
                    foundPile.comments.push(comment);
                    foundPile.save();
                    res.redirect('back');
                }
            });
        }
    });
});

//DELETE
router.delete('/comment/:id', middleware.isLoggedIn, function(req, res){
    newComment.findByIdAndRemove(req.params.id, function(err, foundComment){
        if(err){
            console.log(err);
        }else{
            res.redirect('back');
        }
    });
});

module.exports = router;