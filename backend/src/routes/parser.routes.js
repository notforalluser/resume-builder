import { Router } from 'express';
import multer from 'multer';
import { parseUpload } from '../controllers/parser.controller.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    cb(null, allowed.includes(file.mimetype));
  }
});

router.post('/upload', upload.single('resume'), parseUpload);
export default router;
