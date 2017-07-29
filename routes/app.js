var express = require('express'),
    router = express.Router();

router.get('/', function(req, res){
    res.render('app/show');
});

router.get('/calc', function(req,res){
    res.render('app/calc');
});

router.get('/rome', function(req, res){
    res.render('app/rome');
});

router.get('/pomo', function(req, res){
    res.render('app/pomo');
});



module.exports = router;