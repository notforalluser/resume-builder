# Resume Studio MERN SaaS

Professional Resume Builder and Resume Parser web application using React, Tailwind CSS, Redux Toolkit, React Hook Form, React PDF, Node.js, Express, MongoDB, Mongoose, JWT, Multer, `pdf-parse`, and `mammoth`.

## Features

- Split-screen resume builder with live preview.
- Template 1 selected by default, plus ATS Friendly, Executive, Creative, and Minimal variants.
- Default resume data follows the Prince Tiwari technical support resume context from the prompt.
- Editable personal info, summary, skills, experience, projects, achievements, education, and custom sections.
- Global styling controller for font, size, line height, spacing, page margin, and theme color.
- Local storage autosave for every builder change.
- Preview-matching PDF export via `html2canvas` and `jsPDF` as `Prince_Tiwari_Resume.pdf`, including multi-page slicing when the resume grows.
- Resume parser upload flow for PDF/DOCX with confirmation into builder.
- ATS score suggestions.
- JWT auth, resume CRUD APIs, MongoDB schemas, parser records, version history, and dashboard shell.

## Run Locally

```bash
cd outputs/resume-saas
npm run install:all
copy backend\.env.example backend\.env
npm run dev
```

MongoDB must be running locally:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/resume_builder
```

Frontend: `http://127.0.0.1:5173`

Backend: `http://127.0.0.1:5000`

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/resume`
- `POST /api/resume/save`
- `GET /api/resume/:id`
- `PUT /api/resume/update/:id`
- `DELETE /api/resume/:id`
- `POST /api/parser/upload`

## Implementation Notes

The frontend downloads the same rendered resume that appears in the preview, matching the print layout and splitting long resumes across multiple PDF pages. The backend parser extracts raw PDF/DOCX text and maps it into the same resume JSON contract used by the builder, so parsed resumes can be confirmed and edited without a separate data model.
