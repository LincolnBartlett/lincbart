var express          = require('express'),
    multer           = require('multer'),
    middleware       = require('../middleware'),
    router           = express.Router();

var upload = multer({dest: 'public/uploads/'});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/uploads/${file.fieldname}`)
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + '.png')
  }
});


upload = multer({ storage: storage });

router.post('/', middleware.isLoggedIn, middleware.isGuest, upload.single('avatar'), function (req, res) {
    res.redirect('/user/profile');
});


module.exports = router;