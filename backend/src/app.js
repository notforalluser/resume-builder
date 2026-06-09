import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resume.routes.js';
import parserRoutes from './routes/parser.routes.js';

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/resume', resumeRoutes);
app.use('/api/parser', parserRoutes);
