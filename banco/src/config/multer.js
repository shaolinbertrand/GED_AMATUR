const multer = require('multer');
const path = require('path');


module.exports = multer({ storage: multer.diskStorage({
    destination: path.join(__dirname,'..','upload'),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname.replace(/\s/g,'-')}`);
    },
  })
})
 