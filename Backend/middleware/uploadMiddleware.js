  // import multer from 'multer';
  // import path from 'path';

  // const storage = multer.memoryStorage(); // Store files in memory

  // const upload = multer({
  //   storage: storage,
  //   limits: { fileSize: 1000000 }, // Limit file size to 1MB
  //   fileFilter: (req, file, cb) => {
  //     checkFileType(file, cb);
  //   },
  // });

  // function checkFileType(file, cb) {
  //   const filetypes = /jpeg|jpg|png|gif/;
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //   const mimetype = filetypes.test(file.mimetype);

  //   if (mimetype && extname) {
  //     return cb(null, true);
  //   } else {
  //     cb('Error: Images Only!');
  //   }
  // }

  // export default upload;



  import multer from 'multer';

  const storage = multer.memoryStorage(); // Store in memory
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  });
  
  export default upload;
  