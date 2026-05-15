import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

const candidateSchema = new Schema(
  {
    linkedin_url: { type: String, required: true, unique: true, index: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    current_title: { type: String, default: '' },
    current_company: { type: String, default: '' },
    location: { type: String, default: '' },
    email: { type: String, index: true },
    phone: String,
    apollo_id: { type: String, index: true },
    source: {
      type: String,
      enum: ['linkedin_csv', 'manual', 'applicant', 'referral'],
      default: 'linkedin_csv',
    },
    tags: { type: [String], default: [] },
    notes: { type: String, default: '' },
    first_seen_at: { type: Date, default: Date.now },
    last_touched_at: { type: Date, default: Date.now },
    pii_scrubbed_for_voice: { type: Boolean, default: false },
    authenticity_score: { type: Number, min: 0, max: 100 },
    forgotten_at: Date, // GDPR delete marker; non-null means tombstoned
  },
  { timestamps: true }
);

export type CandidateDoc = InferSchemaType<typeof candidateSchema>;

export const Candidate: Model<CandidateDoc> =
  (models.Candidate as Model<CandidateDoc>) || model<CandidateDoc>('Candidate', candidateSchema);
