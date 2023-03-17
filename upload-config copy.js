const multer = require("multer");
const path = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/uploads/"));
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
};
