import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: false },
    title: { type: String, default: 'Prince Tiwari Resume' },
    template: { type: String, default: 'modern' },
    styling: { type: Object, default: {} },
    data: { type: Object, required: true },
    analytics: {
      downloads: { type: Number, default: 0 },
      lastDownloadedAt: Date
    },
    versions: [{ data: Object, styling: Object, createdAt: { type: Date, default: Date.now } }]
  },
  { timestamps: true }
);

export const Resume = mongoose.model('Resume', resumeSchema);
