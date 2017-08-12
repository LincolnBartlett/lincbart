var express          = require('express'),
    ejs              = require('ejs'),
    dateFormat       = require('dateformat'),
    mongoose         = require('mongoose'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override'),
    passport         = require('passport'),
    LocalStrategy    = require('passport-local'),
    User             = require('./models/userSchema'),
    app              = express(),
    expressSanitizer = require('express-sanitizer');

var port = 1901; 
mongoose.connect('mongodb://localhost/lincbart2');


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

//PASSPORT
app.use(require('express-session')({
    secret:"super secret passcode",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//ROUTES
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/front', function(req , res){
    res.render('front');
});



var appRoute     = require('./routes/app.js'),
    crudRoute    = require('./routes/crud.js'),
    blogRoute    = require('./routes/blog.js'),
    userRoute    = require('./routes/user.js'),
    uploadRoute  = require('./routes/uploads.js');


app.use('/app', appRoute);
app.use('/crud', crudRoute);
app.use('/blog', blogRoute);
app.use('/user', userRoute);
app.use('/upload', uploadRoute);


app.get('/*', function(req, res){
    res.redirect('/');
});


app.listen(port, function(){
console.log(`Server started on ${dateFormat(new Date())}`)
});
