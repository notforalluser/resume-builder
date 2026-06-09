import { useState } from 'react';
import { Check, FileSearch, UploadCloud } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { importResume } from '../redux/resumeSlice.js';
import { api } from '../services/api.js';
import { ResumePreview } from '../templates/ResumePreview.jsx';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Parser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { styling, template, data } = useSelector((state) => state.resume);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(selected) {
    if (!selected) return;
    setFile(selected);
    setBusy(true);
    setError('');
    try {
      const form = new FormData();
      form.append('resume', selected);
      const { data: parsed } = await api.post('/parser/upload', form);
      setResult(parsed);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to parse this file. Check that the backend is running and the file is PDF or DOCX.');
    } finally {
      setBusy(false);
    }
  }

  function confirm() {
    if (!result?.parsedData) return;
    dispatch(importResume(result.parsedData));
    navigate('/builder');
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-5">
      <div className="panel mb-4 flex items-center justify-between gap-4 p-4">
        <div>
          <h1 className="text-xl font-black">Professional Resume Parser</h1>
          <p className="text-sm text-muted">Upload a PDF or DOCX resume to extract contact details, skills, work history, projects, education, achievements, and ATS recommendations.</p>
        </div>
        {result && <button className="bg-brand px-4 py-2 font-bold text-white" onClick={confirm}><Check size={16} className="inline" /> Confirm & Continue</button>}
      </div>

      <div className="grid gap-4 lg:grid-cols-[520px_1fr]">
        <div className="grid content-start gap-4">
          <div className="panel p-4">
            <label className="flex min-h-48 cursor-pointer place-items-center justify-center rounded-md border-2 border-dashed border-line text-center">
              <input className="hidden" type="file" accept=".pdf,.docx" onChange={(event) => upload(event.target.files[0])} />
              <span><UploadCloud className="mx-auto mb-2" /> Drag & drop or choose PDF/DOCX</span>
            </label>
            {busy && <p className="mt-4 font-bold">Parsing resume...</p>}
            {error && <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
            {file?.type === 'application/pdf' && <div className="mt-4 overflow-auto"><Document file={file}><Page pageNumber={1} width={470} /></Document></div>}
          </div>

          {result && <AtsPanel ats={result.ats} />}
        </div>

        <div className="overflow-auto">
          <ResumePreview data={result?.parsedData || data} styling={styling} template={template} />
        </div>
      </div>
    </section>
  );
}

function AtsPanel({ ats }) {
  const status = ats.score >= 85 ? 'Excellent ATS match' : ats.score >= 70 ? 'Good foundation' : 'Needs optimization';
  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-black"><FileSearch size={18} /> ATS Optimization</div>
        <b className="rounded-md bg-emerald-50 px-3 py-1 text-emerald-700">{ats.score}%</b>
      </div>
      <p className="mb-3 text-sm font-bold">{status}</p>
      <ul className="grid gap-2 text-sm">
        {ats.suggestions.map((item) => <li key={item} className="rounded-md border border-line p-2">{item}</li>)}
      </ul>
      {!!ats.missingKeywords?.length && (
        <div className="mt-3">
          <b className="text-sm">Missing keywords</b>
          <p className="mt-1 text-sm text-muted">{ats.missingKeywords.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
