import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|avif|gif|mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and Videos Only!');
  }
}

export default upload;


  // import multer from 'multer';

  // const storage = multer.memoryStorage(); // Store in memory
  
  // const upload = multer({
  //   storage: storage,
  //   limits: { fileSize: 1000 * 1024 * 1024 }, // 10MB limit
  // });
  
  // export default upload;
  