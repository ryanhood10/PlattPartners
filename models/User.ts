import { Schema, model, models, type Model, type InferSchemaType } from 'mongoose';

// Authenticated dashboard user. Peter is the first; future entries can be
// his assistant or team members. Tokens for MS Graph stored here per user.

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: '' },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'owner',
    },
    // MS Graph delegated tokens (encrypted-at-rest by Atlas)
    ms_refresh_token: String,
    ms_access_token: String,
    ms_token_expires_at: Date,
    // Google delegated tokens (GA4 + Search Console)
    google_refresh_token: String,
    last_signin_at: Date,
    deactivated_at: Date,
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema>;

export const User: Model<UserDoc> =
  (models.User as Model<UserDoc>) || model<UserDoc>('User', userSchema);
