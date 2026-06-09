import { FilePlus, Upload } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetResume } from '../redux/resumeSlice.js';

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="panel p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-black">Resume Dashboard</h1>
          <p className="mt-2 text-sm text-muted">Start a clean ATS-friendly resume or parse an existing resume into editable fields.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            className="flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 font-bold text-white"
            to="/builder"
            onClick={() => dispatch(resetResume())}
          >
            <FilePlus size={18} /> Create New Resume
          </Link>
          <Link className="flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 font-bold" to="/parser">
            <Upload size={18} /> Parse Existing Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
