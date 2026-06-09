import { NavLink, Route, Routes } from 'react-router-dom';
import { FileText, LayoutDashboard, Upload } from 'lucide-react';
import Dashboard from './pages/Dashboard.jsx';
import Builder from './pages/Builder.jsx';
import Parser from './pages/Parser.jsx';

export default function App() {
  return (
    <main className="min-h-screen">
      <nav className="no-print sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-black text-ink"><FileText size={20} /> Resume Studio</div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <NavLink className="px-3 py-2" to="/"><LayoutDashboard size={16} className="inline" /> Dashboard</NavLink>
            <NavLink className="px-3 py-2" to="/builder">Resume Builder</NavLink>
            <NavLink className="px-3 py-2" to="/parser"><Upload size={16} className="inline" /> Resume Parser</NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/parser" element={<Parser />} />
      </Routes>
    </main>
  );
}
