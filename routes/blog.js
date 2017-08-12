var express          = require('express'),
    router           = express.Router(),
    Blog             = require('../models/blogSchema'),
    mongoose         = require('mongoose'),
    middleware       = require('../middleware'),
    newComment       = require('../models/commentSchema');

//INDEX
router.get('/', function(req, res){
    res.redirect('blog/pages/0'); 
});

//PAGES

router.get('/pages/:id', function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        }else{
        var page = Number(req.params.id);
        var displaynum = 5;
        var pagecount = page * displaynum;
        var displaystart= allBlogs.length - pagecount;
        var displayend= (displaystart) - displaynum;
        var displayblogs= [];
            if(displayend >= 0){
                for(var i = displaystart; i > displayend ; i--){
                    displayblogs.push(allBlogs[i - 1]);
                }
                res.render('blog/hub',{allBlogs:displayblogs,pagenum:page});

            }else if(displayend < 0 && displaystart > 0){
                 for(var i = displaystart; i > 0; i--){
                    displayblogs.push(allBlogs[i - 1]);
                }
                res.render('blog/hub',{allBlogs:displayblogs,pagenum:page});

            }else{
                res.redirect('/blog');
            }
        }
    });
});

//NEW
router.get('/new', middleware.isLoggedIn, middleware.isMe, function(req, res){
    res.render('blog/new');
});

//CREATE
router.post('/', middleware.isLoggedIn, middleware.isMe, function(req, res){
    var name= req.body.blog.name;
    var body= req.body.blog.body;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newBlog = {name: name, body: body, author:author};
    Blog.create(newBlog, function(err, newBlog){
        if(err){
            res.render('blog/new');
        } else {
            res.redirect('/blog');
        }
    });
});

//SHOW
router.get('/:id', function(req, res){
    Blog.findById(req.params.id).populate('comments').exec(function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        }else{
            res.render('blog/show', {foundBlog: foundBlog});
        }
    });
});

//EDIT
router.get('/:id/edit', middleware.checkBlogOwner, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        }else{
            res.render('blog/edit', {foundBlog: foundBlog});
        }
    });
});


//UPDATE
router.put('/:id', middleware.checkBlogOwner, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,foundBlog){
        if(err){
            res.redirect('/blog');
        }else{
            res.redirect('/blog/' + req.params.id);
        }
    });
});

//DELETE
router.delete('/:id', middleware.checkBlogOwner, middleware.isMe, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect('/blog/hub');
        }
    });
}); 




//COMMENT ROUTES
//NEW
router.get('/:id/comment/new', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        }else{
            res.render('blog/comment',{foundBlog: foundBlog, id: req.params.id});  
        }
    });
    
});

//CREATE
router.post('/:id/comment', middleware.isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){   
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
                    foundBlog.comments.push(comment);
                    foundBlog.save();
                    res.redirect('/blog/'+ foundBlog.id);
                }
            });
        }
    });
});



module.exports = router; 