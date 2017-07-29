var port = 1901;
var now = new Date();

var express     = require('express'),
    app         = express(),
    ejs         = require('ejs'),
    dateFormat  = require('dateformat');

    
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


//ROUTES
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/front', function(req , res){
    res.render('front');
});

var appRoute = require('./routes/app.js'),
    crudRoute = require('./routes/crud.js'),
    blogRoute = require('./routes/blog.js');


app.use('/app', appRoute);
app.use('/crud', crudRoute);
app.use('/blog', blogRoute);





app.listen(port, function(){
console.log(`Server started on ${dateFormat(now)}`)
});
