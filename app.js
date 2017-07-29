var express          = require('express'),
    app              = express(),
    ejs              = require('ejs'),
    dateFormat       = require('dateformat'),
    mongoose         = require('mongoose'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override');

var port = 1901; 

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/lincbart1');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


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
console.log(`Server started on ${dateFormat(new Date())}`)
});
