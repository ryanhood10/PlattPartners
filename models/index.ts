// Centralized model exports. Import from here in routes:
//   import { Candidate, Client } from '@/models';

export { Candidate } from './Candidate';
export { Client } from './Client';
export { Job } from './Job';
export { PipelineState, PIPELINE_STAGES } from './PipelineState';
export type { PipelineStage } from './PipelineState';
export { OutreachDraft } from './OutreachDraft';
export { EmailMeta } from './EmailMeta';
export { Contact } from './Contact';
export { User } from './User';

export type { CandidateDoc } from './Candidate';
export type { ClientDoc } from './Client';
export type { JobDoc } from './Job';
export type { PipelineStateDoc } from './PipelineState';
export type { OutreachDraftDoc } from './OutreachDraft';
export type { EmailMetaDoc } from './EmailMeta';
export type { ContactDoc } from './Contact';
export type { UserDoc } from './User';
