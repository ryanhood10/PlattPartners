import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

// NOTE: email bodies are NOT stored here. Use ms_message_id to fetch on demand
// from MS Graph. Only metadata + AI-generated summary lives in Mongo.

const emailMetaSchema = new Schema(
  {
    ms_message_id: { type: String, required: true, unique: true, index: true },
    thread_id: { type: String, index: true },
    direction: { type: String, enum: ['inbound', 'outbound'], required: true },
    from: { type: String, required: true },
    to: { type: [String], default: [] },
    subject: { type: String, default: '' },
    received_at: { type: Date, required: true, index: true },
    candidate_id: { type: Schema.Types.ObjectId, ref: 'Candidate', index: true },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client', index: true },
    classification: {
      type: String,
      enum: ['positive', 'neutral', 'negative', 'ooo', 'irrelevant'],
    },
    summary: String, // Haiku-generated
  },
  { timestamps: true }
);

export type EmailMetaDoc = InferSchemaType<typeof emailMetaSchema>;

export const EmailMeta: Model<EmailMetaDoc> =
  (models.EmailMeta as Model<EmailMetaDoc>) ||
  model<EmailMetaDoc>('EmailMeta', emailMetaSchema);
