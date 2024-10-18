import multer from "multer";

const storage = multer.diskStorage({
  /* 
    -> req - gives the data inside form eg: username, email , password 
    -> file - gives the access to file explicitly
     */
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
