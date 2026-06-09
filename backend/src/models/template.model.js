import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    name: String,
    category: String,
    config: Object,
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const ResumeTemplate = mongoose.model('ResumeTemplate', templateSchema);
