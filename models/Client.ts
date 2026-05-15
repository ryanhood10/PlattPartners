import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

const clientSchema = new Schema(
  {
    company: { type: String, required: true, index: true },
    contact_name: { type: String, required: true },
    contact_title: String,
    contact_email: { type: String, required: true, index: true },
    contact_phone: String,
    tier: { type: Number, min: 1, max: 3, default: 3 },
    vertical: {
      type: String,
      enum: ['restaurant', 'tech', 'it', 'finance', 'construction', 'other'],
      default: 'other',
    },
    is_friday_call_list: { type: Boolean, default: false, index: true },
    last_contact_at: Date,
    last_role_filled: String,
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export type ClientDoc = InferSchemaType<typeof clientSchema>;

export const Client: Model<ClientDoc> =
  (models.Client as Model<ClientDoc>) || model<ClientDoc>('Client', clientSchema);
