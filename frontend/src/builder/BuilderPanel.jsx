import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, RotateCcw, RotateCw, Trash2 } from 'lucide-react';
import { TextInput } from './FieldGroup.jsx';
import { redo, undo, updatePersonal, updateSection, updateSectionTitle, updateStyling, updateSummary } from '../redux/resumeSlice.js';

const fontOptions = [
  'Arial, Helvetica, sans-serif',
  'Calibri, Arial, sans-serif',
  'Cambria, Georgia, serif',
  'Georgia, serif',
  'Garamond, Georgia, serif',
  'Times New Roman, Times, serif',
  'Inter',
  'Verdana, Geneva, sans-serif'
];

export default function BuilderPanel() {
  const { data, styling } = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  const updateList = (key, value) => dispatch(updateSection({ key, value }));
  const updateTitle = (key, value) => dispatch(updateSectionTitle({ key, value }));

  return (
    <div className="grid gap-4">
      <div className="panel p-4">
        <div className="mb-3 flex justify-between">
          <h2 className="font-black">Personal Information</h2>
          <div className="flex gap-2">
            <button title="Undo" className="border border-line p-2" onClick={() => dispatch(undo())}><RotateCcw size={16} /></button>
            <button title="Redo" className="border border-line p-2" onClick={() => dispatch(redo())}><RotateCw size={16} /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['fullName', 'title', 'phone', 'email', 'portfolio', 'linkedIn', 'github', 'location'].map((key) => (
            <TextInput key={key} label={key.replace(/([A-Z])/g, ' $1')} value={data.personal[key]} onChange={(value) => dispatch(updatePersonal({ [key]: value }))} />
          ))}
        </div>
      </div>

      <div className="panel p-4">
        <h2 className="mb-3 font-black">Professional Summary</h2>
        <div className="grid gap-3">
          <TextInput label="Summary Title" value={data.sectionTitles?.summary || data.summary.title} onChange={(value) => updateTitle('summary', value)} />
          <TextInput textarea label="Summary Description" value={data.summary.description} onChange={(value) => dispatch(updateSummary({ description: value }))} />
          <p className="text-xs font-semibold text-muted">Use **bold text** inside descriptions to bold selected words in the preview.</p>
        </div>
      </div>

      <EditableList title={data.sectionTitles?.skills || 'Skills'} onTitleChange={(value) => updateTitle('skills', value)} items={data.skills} onChange={(items) => updateList('skills', items)} render={(item, patch) => (
        <div className="grid gap-2">
          <TextInput label="Category" value={item.category} onChange={(value) => patch({ category: value })} />
          <CommaInput label="Skills, comma separated" value={item.skills} onCommit={(skills) => patch({ skills })} />
        </div>
      )} empty={{ category: 'New Category', skills: ['New Skill'] }} />

      <EditableList title={data.sectionTitles?.experience || 'Experience'} onTitleChange={(value) => updateTitle('experience', value)} items={data.experience} onChange={(items) => updateList('experience', items)} render={(item, patch) => (
        <ExperienceFields item={item} patch={patch} />
      )} empty={{ jobTitle: 'Job Title', company: 'Company', employmentType: '', location: '', skillsUsed: '', startDate: '', endDate: '', bullets: ['Add measurable impact.'] }} />

      <EditableList title={data.sectionTitles?.projects || 'Projects'} onTitleChange={(value) => updateTitle('projects', value)} items={data.projects} onChange={(items) => updateList('projects', items)} render={(item, patch) => (
        <ProjectFields item={item} patch={patch} />
      )} empty={{ name: 'Project Name', skillsUsed: '', location: '', liveUrl: '', githubUrl: '', startDate: '', endDate: '', bullets: ['Describe the project result.'] }} />

      <EditableList title={data.sectionTitles?.achievements || 'Achievements'} onTitleChange={(value) => updateTitle('achievements', value)} items={data.achievements} onChange={(items) => updateList('achievements', items)} render={(item, patch) => (
        <div className="grid gap-2">
          <TextInput label="Achievement Title" value={item.title} onChange={(value) => patch({ title: value })} />
          <TextInput textarea label="Description" value={item.description} onChange={(value) => patch({ description: value })} />
        </div>
      )} empty={{ title: 'Achievement', description: 'Describe the achievement.' }} />

      <EditableList title={data.sectionTitles?.education || 'Education'} onTitleChange={(value) => updateTitle('education', value)} items={data.education} onChange={(items) => updateList('education', items)} render={(item, patch) => (
        <div className="grid grid-cols-2 gap-2">
          {['school', 'program', 'course', 'score', 'startDate', 'endDate'].map((key) => <TextInput key={key} label={key} value={item[key]} onChange={(value) => patch({ [key]: value })} />)}
        </div>
      )} empty={{ school: 'College', program: 'Degree', course: 'Course', score: 'CGPA', startDate: 'Jan 2026', endDate: 'Present' }} />

      <div className="panel p-4">
        <h2 className="mb-3 font-black">Resume Styling Controller</h2>
        <div className="grid grid-cols-3 gap-3">
          <label>
            Font Family
            <select value={styling.fontFamily} onChange={(event) => dispatch(updateStyling({ fontFamily: event.target.value }))}>
              {fontOptions.map((font) => <option key={font} value={font}>{font.split(',')[0]}</option>)}
            </select>
          </label>
          <TextInput label="Font Size" value={styling.fontSize} onChange={(value) => dispatch(updateStyling({ fontSize: Number(value) || 14 }))} />
          <TextInput label="Line Height" value={styling.lineHeight} onChange={(value) => dispatch(updateStyling({ lineHeight: Number(value) || 1.4 }))} />
          <TextInput label="Section Gap" value={styling.sectionGap} onChange={(value) => dispatch(updateStyling({ sectionGap: Number(value) || 18 }))} />
          <TextInput label="Page Margin" value={styling.pageMargin} onChange={(value) => dispatch(updateStyling({ pageMargin: Number(value) || 42 }))} />
          <label>Theme Color<input type="color" value={styling.themeColor} onChange={(event) => dispatch(updateStyling({ themeColor: event.target.value }))} /></label>
        </div>
      </div>
    </div>
  );
}

function EditableList({ title, onTitleChange, items, onChange, render, empty }) {
  function patchAt(index, patch) {
    onChange(items.map((item, current) => current === index ? { ...item, ...patch } : item));
  }

  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <input className="max-w-64 border-0 bg-transparent p-0 text-base font-black" value={title} onChange={(event) => onTitleChange?.(event.target.value)} />
        <button className="bg-ink px-3 py-2 text-white" onClick={() => onChange([...items, empty])}><Plus size={16} /></button>
      </div>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div className="rounded-md border border-line p-3" key={index}>
            {render(item, (patch) => patchAt(index, patch))}
            <button className="mt-2 border border-line px-3 py-2 text-accent" onClick={() => onChange(items.filter((_, current) => current !== index))}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommaInput({ label, value, onCommit }) {
  const [text, setText] = useState((value || []).join(', '));

  useEffect(() => {
    setText((value || []).join(', '));
  }, [value]);

  return (
    <label>
      {label}
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={() => onCommit(text.split(',').map((skill) => skill.trim()).filter(Boolean))}
      />
    </label>
  );
}

function BulletTextarea({ value, onCommit }) {
  const [text, setText] = useState((value || []).join('\n'));

  useEffect(() => {
    setText((value || []).join('\n'));
  }, [value]);

  return (
    <label>
      Description Bullet Points
      <textarea
        rows={5}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onBlur={() => onCommit(text.split('\n').map((line) => line.trim()).filter(Boolean))}
      />
    </label>
  );
}

function ExperienceFields({ item, patch }) {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 gap-2">
        <TextInput label="Job Title" value={item.jobTitle} onChange={(value) => patch({ jobTitle: value })} />
        <TextInput label="Company" value={item.company} onChange={(value) => patch({ company: value })} />
        <TextInput label="Employment Type" value={item.employmentType} onChange={(value) => patch({ employmentType: value })} />
        <TextInput label="Location" value={item.location} onChange={(value) => patch({ location: value })} />
        <TextInput label="Skills Used" value={item.skillsUsed} onChange={(value) => patch({ skillsUsed: value })} />
        <TextInput label="Start Date" value={item.startDate} onChange={(value) => patch({ startDate: value })} />
        <TextInput label="End Date" value={item.endDate} onChange={(value) => patch({ endDate: value })} />
      </div>
      <BulletTextarea value={item.bullets} onCommit={(bullets) => patch({ bullets })} />
    </div>
  );
}

function ProjectFields({ item, patch }) {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 gap-2">
        <TextInput label="Project Name" value={item.name} onChange={(value) => patch({ name: value })} />
        <TextInput label="Skills Used" value={item.skillsUsed} onChange={(value) => patch({ skillsUsed: value })} />
        <TextInput label="Location" value={item.location} onChange={(value) => patch({ location: value })} />
        <TextInput label="Live Project Link" value={item.liveUrl} onChange={(value) => patch({ liveUrl: value })} />
        <TextInput label="GitHub Link" value={item.githubUrl} onChange={(value) => patch({ githubUrl: value })} />
        <TextInput label="Start Date" value={item.startDate} onChange={(value) => patch({ startDate: value })} />
        <TextInput label="End Date" value={item.endDate} onChange={(value) => patch({ endDate: value })} />
      </div>
      <BulletTextarea value={item.bullets} onCommit={(bullets) => patch({ bullets })} />
    </div>
  );
}
