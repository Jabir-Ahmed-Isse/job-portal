// Multer handles multipart uploads. Files go to a temp path on disk and are
// then uploaded to Cloudinary by the controllers.
import multer from 'multer';    

const storage = multer.diskStorage({})    

const upload = multer({ storage })

export default upload;