import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

export const PIPELINE_STAGES = [
  'sourced',
  'outreach_queued',
  'outreach_sent',
  'replied',
  'prescreen_scheduled',
  'prescreened',
  'submitted_to_client',
  'client_interview',
  'offer',
  'placed',
  'declined',
  'withdrawn',
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

const historyEntrySchema = new Schema(
  {
    stage: { type: String, enum: PIPELINE_STAGES, required: true },
    at: { type: Date, default: Date.now },
    by: String, // user email or 'system'
  },
  { _id: false }
);

const pipelineStateSchema = new Schema(
  {
    candidate_id: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true, index: true },
    job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    stage: {
      type: String,
      enum: PIPELINE_STAGES,
      default: 'sourced',
      index: true,
    },
    score: { type: Number, min: 0, max: 100, default: 0 },
    score_rationale: { type: String, default: '' },
    history: { type: [historyEntrySchema], default: [] },
  },
  { timestamps: true }
);

pipelineStateSchema.index({ candidate_id: 1, job_id: 1 }, { unique: true });

export type PipelineStateDoc = InferSchemaType<typeof pipelineStateSchema>;

export const PipelineState: Model<PipelineStateDoc> =
  (models.PipelineState as Model<PipelineStateDoc>) ||
  model<PipelineStateDoc>('PipelineState', pipelineStateSchema);
