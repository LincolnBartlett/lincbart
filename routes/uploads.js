var express          = require('express'),
    multer           = require('multer'),
    middleware       = require('../middleware'),
    router           = express.Router();

var upload = multer({ dest: 'public/uploads/' })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + req.user._id + '.png')
  }
});

upload = multer({ storage: storage });

router.get('/', middleware.isLoggedIn, function(req, res){
    res.render('upload');
});

router.post('/avatar', middleware.isLoggedIn, upload.single('avatar'), function (req, res) {
    console.log(req.file);
    res.redirect('back');
});


module.exports = router;