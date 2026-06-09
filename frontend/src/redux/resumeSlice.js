import { createSlice } from '@reduxjs/toolkit';
import { blankResume, defaultResume, defaultStyling, templates } from '../data.js';

const saved = JSON.parse(localStorage.getItem('resumeState') || 'null');
const templateIds = templates.map((template) => template.id);
const initialState = saved ? {
  ...saved,
  template: templateIds.includes(saved.template) ? saved.template : 'latex',
  data: {
    ...defaultResume,
    ...saved.data,
    personal: { ...defaultResume.personal, ...saved.data?.personal },
    sectionTitles: { ...defaultResume.sectionTitles, ...saved.data?.sectionTitles },
    summary: { ...defaultResume.summary, ...saved.data?.summary }
  },
  styling: { ...defaultStyling, ...saved.styling }
} : {
  data: defaultResume,
  template: 'latex',
  styling: defaultStyling,
  history: [],
  future: []
};

const snapshot = (state) => ({ data: state.data, template: state.template, styling: state.styling });
const pushHistory = (state) => {
  state.history.push(snapshot(state));
  if (state.history.length > 75) state.history.shift();
  state.future = [];
};

const mergeResume = (incoming = blankResume) => ({
  ...blankResume,
  ...incoming,
  personal: { ...blankResume.personal, ...incoming.personal },
  sectionTitles: { ...blankResume.sectionTitles, ...incoming.sectionTitles },
  summary: { ...blankResume.summary, ...incoming.summary },
  skills: incoming.skills?.length ? incoming.skills : blankResume.skills,
  experience: incoming.experience || [],
  projects: incoming.projects || [],
  achievements: incoming.achievements || [],
  education: incoming.education || [],
  customSections: incoming.customSections || []
});

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonal(state, action) { pushHistory(state); Object.assign(state.data.personal, action.payload); },
    updateSummary(state, action) { pushHistory(state); Object.assign(state.data.summary, action.payload); },
    updateSection(state, action) { pushHistory(state); state.data[action.payload.key] = action.payload.value; },
    updateSectionTitle(state, action) {
      pushHistory(state);
      state.data.sectionTitles = { ...(state.data.sectionTitles || {}), [action.payload.key]: action.payload.value };
      if (action.payload.key === 'summary') state.data.summary.title = action.payload.value;
    },
    setTemplate(state, action) { pushHistory(state); state.template = action.payload; },
    updateStyling(state, action) { pushHistory(state); Object.assign(state.styling, action.payload); },
    importResume(state, action) { pushHistory(state); state.data = mergeResume(action.payload); },
    resetResume(state) {
      pushHistory(state);
      state.data = mergeResume(blankResume);
      state.template = 'latex';
      state.styling = { ...defaultStyling };
    },
    undo(state) { const previous = state.history.pop(); if (previous) { state.future.push(snapshot(state)); Object.assign(state, previous); } },
    redo(state) { const next = state.future.pop(); if (next) { state.history.push(snapshot(state)); Object.assign(state, next); } }
  }
});

export const { updatePersonal, updateSummary, updateSection, updateSectionTitle, setTemplate, updateStyling, importResume, resetResume, undo, redo } = resumeSlice.actions;
