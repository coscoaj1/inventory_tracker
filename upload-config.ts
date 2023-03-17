import multer from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/uploads/"));
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
};
