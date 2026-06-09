import { configureStore } from '@reduxjs/toolkit';
import { resumeSlice } from './resumeSlice.js';

export const store = configureStore({ reducer: { resume: resumeSlice.reducer } });
store.subscribe(() => localStorage.setItem('resumeState', JSON.stringify(store.getState().resume)));
