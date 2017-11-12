const multer=require('multer');
const mime=require('mime');
const crypto=require('crypto');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + new Date().getTime() + '.' + mime.getExtension(file.mimetype))
    })
  }
})

module.exports=multer({ storage: storage });