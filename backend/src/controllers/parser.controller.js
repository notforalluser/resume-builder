import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { ParsedResume } from '../models/parsedResume.model.js';
import { parseResumeText, scoreAts } from '../services/parser.service.js';

export async function parseUpload(req, res) {
  if (!req.file) return res.status(400).json({ message: 'Upload a PDF or DOCX file' });

  const isPdf = req.file.mimetype === 'application/pdf';
  const rawText = isPdf
    ? (await pdf(req.file.buffer)).text
    : (await mammoth.extractRawText({ buffer: req.file.buffer })).value;

  const parsedData = parseResumeText(rawText);
  const ats = scoreAts(parsedData);
  const record = await ParsedResume.create({
    userId: req.user?.id,
    fileName: req.file.originalname,
    rawText,
    parsedData,
    atsScore: ats.score,
    suggestions: ats.suggestions
  });

  res.json({ id: record._id, rawText, parsedData, ats });
}
