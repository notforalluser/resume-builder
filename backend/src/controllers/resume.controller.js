import { Resume } from '../models/resume.model.js';

export async function listResumes(req, res) {
  res.json(await Resume.find({}).sort({ updatedAt: -1 }));
}

export async function saveResume(req, res) {
  const resume = await Resume.create(req.body);
  res.status(201).json(resume);
}

export async function getResume(req, res) {
  const resume = await Resume.findById(req.params.id);
  if (!resume) return res.status(404).json({ message: 'Resume not found' });
  res.json(resume);
}

export async function updateResume(req, res) {
  const current = await Resume.findById(req.params.id);
  if (!current) return res.status(404).json({ message: 'Resume not found' });
  current.versions.push({ data: current.data, styling: current.styling });
  Object.assign(current, req.body);
  await current.save();
  res.json(current);
}

export async function deleteResume(req, res) {
  await Resume.deleteOne({ _id: req.params.id });
  res.status(204).end();
}
