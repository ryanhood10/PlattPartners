import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

// Submissions from the public marketing-site contact form
// (POST /api/public/contact).

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: String,
    message: { type: String, required: true },
    source: { type: String, default: 'public_form' },
    received_at: { type: Date, default: Date.now, index: true },
    status: {
      type: String,
      enum: ['new', 'responded', 'archived'],
      default: 'new',
      index: true,
    },
    responded_at: Date,
    responded_by: String,
    // Anti-abuse: hash of submitter's IP (we don't store raw IP).
    ip_hash: String,
    user_agent: String,
  },
  { timestamps: true }
);

export type ContactDoc = InferSchemaType<typeof contactSchema>;

export const Contact: Model<ContactDoc> =
  (models.Contact as Model<ContactDoc>) || model<ContactDoc>('Contact', contactSchema);
