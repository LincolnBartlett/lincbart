var express          = require('express'),
    router           = express.Router(),
    Blog             = require('../models/blogSchema'),
    mongoose         = require('mongoose');

//INDEX
router.get('/', function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        }else{
            res.render('blog/hub',{allBlogs: allBlogs});
        }
    });
    
});

//NEW
router.get('/new', function(req, res){
    res.render('blog/new');
});

//CREATE
router.post('/', function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render('blog/new');
        } else {
            res.redirect('/blog');
        }
    });
});

//SHOW
router.get('/:id', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        }else{
            res.render('blog/show', {foundBlog: foundBlog});
        }
    });
});

//EDIT
router.get('/:id/edit', function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blog');
        }else{
            res.render('blog/edit', {foundBlog: foundBlog});
        }
    });
});


//UPDATE
router.put('/:id', function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,foundBlog){
        if(err){
            res.redirect('/blog');
        }else{
            res.redirect('/blog/' + req.params.id);
        }
    });
});

//DELETE
router.delete('/:id', function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect('/blog/hub');
        }
    });
});


module.exports = router; 