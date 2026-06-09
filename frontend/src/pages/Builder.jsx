import { useRef } from 'react';
import { Download, FilePlus, Printer } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import BuilderPanel from '../builder/BuilderPanel.jsx';
import { ResumePreview } from '../templates/ResumePreview.jsx';
import { setTemplate } from '../redux/resumeSlice.js';
import { templates } from '../data.js';
import { usePdfExport } from '../hooks/usePdfExport.js';
import { resetResume } from '../redux/resumeSlice.js';
import { calculateAtsScore } from '../services/ats.js';

export default function Builder() {
  const previewRef = useRef(null);
  const exportPdf = usePdfExport();
  const dispatch = useDispatch();
  const { data, template, styling } = useSelector((state) => state.resume);
  const ats = calculateAtsScore(data);

  return (
    <section className="builder-shell mx-auto grid max-w-7xl gap-4 px-4 py-5 lg:grid-cols-[minmax(420px,1fr)_860px]">
      <div className="builder-editor no-print grid content-start gap-4">
        <div className="panel p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-black">Resume Builder</h1>
              <p className="mt-1 text-xs font-bold text-muted">ATS Score: <span className="text-emerald-700">{ats.score}%</span> {ats.missingKeywords.length ? `| Missing: ${ats.missingKeywords.join(', ')}` : ''}</p>
            </div>
            <div className="flex gap-2">
              <button className="border border-line px-3 py-2" title="Create New Resume" onClick={() => dispatch(resetResume())}><FilePlus size={17} /></button>
              <button className="bg-brand px-3 py-2 text-white" title="Print" onClick={() => window.print()}><Printer size={17} /></button>
              {/* <button className="bg-brand px-3 py-2 text-white" title="Download PDF" onClick={() => exportPdf(previewRef.current)}><Download size={17} /></button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {templates.map((item) => (
              <button key={item.id} className={`border px-3 py-2 text-xs font-bold ${template === item.id ? 'border-brand bg-brand text-white' : 'border-line'}`} onClick={() => dispatch(setTemplate(item.id))}>{item.name}</button>
            ))}
          </div>
        </div>
        <BuilderPanel />
      </div>
      <div className="builder-preview overflow-auto">
        <ResumePreview ref={previewRef} data={data} styling={styling} template={template} />
      </div>
    </section>
  );
}
