import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

const jobSchema = new Schema(
  {
    client_id: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    title: { type: String, required: true },
    jd_text: { type: String, default: '' },
    prescreen_questions: { type: [String], default: [] },
    internal_notes: { type: String, default: '' }, // never sent to candidates
    required_skills: { type: [String], default: [] },
    seniority: {
      type: String,
      enum: ['ic', 'manager', 'director', 'vp', 'cxo'],
      default: 'director',
    },
    vertical: {
      type: String,
      enum: ['restaurant', 'tech', 'it', 'finance', 'construction', 'other'],
      default: 'other',
    },
    opened_at: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['open', 'placed', 'closed-no-fill', 'paused'],
      default: 'open',
      index: true,
    },
  },
  { timestamps: true }
);

export type JobDoc = InferSchemaType<typeof jobSchema>;

export const Job: Model<JobDoc> =
  (models.Job as Model<JobDoc>) || model<JobDoc>('Job', jobSchema);
