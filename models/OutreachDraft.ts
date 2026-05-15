import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

const outreachDraftSchema = new Schema(
  {
    pipeline_state_id: {
      type: Schema.Types.ObjectId,
      ref: 'PipelineState',
      required: true,
      index: true,
    },
    draft_subject: { type: String, required: true },
    draft_body: { type: String, required: true },
    drafted_by_model: { type: String, default: 'claude-sonnet-4-6' },
    drafted_at: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'approved', 'edited', 'rejected', 'sent'],
      default: 'pending',
      index: true,
    },
    approved_by: String, // user email
    edited_body: String,
    sent_message_id: String, // M365 message id after send
    rejected_reason: String,
  },
  { timestamps: true }
);

export type OutreachDraftDoc = InferSchemaType<typeof outreachDraftSchema>;

export const OutreachDraft: Model<OutreachDraftDoc> =
  (models.OutreachDraft as Model<OutreachDraftDoc>) ||
  model<OutreachDraftDoc>('OutreachDraft', outreachDraftSchema);
