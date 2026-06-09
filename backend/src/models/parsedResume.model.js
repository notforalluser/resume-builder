import mongoose from 'mongoose';

const parsedResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fileName: String,
    rawText: String,
    parsedData: Object,
    atsScore: Number,
    suggestions: [String]
  },
  { timestamps: true }
);

export const ParsedResume = mongoose.model('ParsedResume', parsedResumeSchema);
