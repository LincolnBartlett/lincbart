var port = 1901;
var now = new Date();

var express     = require('express'),
    app         = express(),
    ejs         = require('ejs'),
    dateFormat  = require('dateformat');

    
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.redirect('/front');
});

app.get('/front', function(req , res){
    res.render('front');
});





app.listen(port, function(){
console.log(`Server started on ${dateFormat(now)}`)
});
