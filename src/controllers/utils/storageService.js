import multer from "multer";

// Configure the multer middleware
// The diskStorage method is used to configure the storage engine
// The storage engine is used to determine where to store the uploaded files
const storage = multer.diskStorage({
  // Define the destination and filename for the uploaded file

  // The destination is a function that determines where to store the uploaded file
  destination: (req, file, cb) => {
    // The destination is the uploads folder
    cb(null, "uploads/");
  },
  // The filename is the name of the file
  filename: (req, file, cb) => {
    // Generate a unique filename using the current date and a random number between 0 and 1E9
    // The random number is used to ensure that the filename is unique
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    // Call the callback with the filename as the second argument (null is the first argument)
    // file.fieldname is the name of the field in the front-end form (here "picture")
    cb(null, `${file.fieldname}-${uniqueSuffix}`)
  },
});

// Export the multer middleware with the configured storage engine
// The storage engine determines where to store the uploaded files
// The uploaded files will be stored in the uploads folder
export default multer({ storage });