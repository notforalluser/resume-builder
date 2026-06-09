import { Router } from 'express';
import { deleteResume, getResume, listResumes, saveResume, updateResume } from '../controllers/resume.controller.js';

const router = Router();
router.get('/', listResumes);
router.post('/save', saveResume);
router.get('/:id', getResume);
router.put('/update/:id', updateResume);
router.delete('/:id', deleteResume);
export default router;
