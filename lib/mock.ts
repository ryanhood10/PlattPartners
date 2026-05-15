// Mock data for dashboard pages while Atlas isn't connected yet.
// All names/emails fictional. Companies match Peter's stated client + ICP list.
// Delete this file (and its imports) once real data flows in.
//
// Each fixture is shaped to match the corresponding Mongoose model so swapping
// to live queries is a one-line change in each page.

import type { PipelineStage } from '@/models/PipelineState';

export type MockCandidate = {
  id: string;
  name: string;
  title: string;
  company: string;
  score: number;
  stage: PipelineStage;
  lastTouchedDays: number;
  tags: string[];
};

export const MOCK_CANDIDATES: MockCandidate[] = [
  {
    id: 'c1',
    name: 'Alexis Tran',
    title: 'Director of DevOps',
    company: 'Pinpoint Cloud',
    score: 88,
    stage: 'submitted_to_client',
    lastTouchedDays: 2,
    tags: ['tech', 'devops'],
  },
  {
    id: 'c2',
    name: 'Marcus Reilly',
    title: 'VP of Operations',
    company: 'Crave Hospitality',
    score: 82,
    stage: 'client_interview',
    lastTouchedDays: 1,
    tags: ['restaurant', 'ops'],
  },
  {
    id: 'c3',
    name: 'Priya Sundaram',
    title: 'Chief Information Officer',
    company: 'StoneArch Holdings',
    score: 91,
    stage: 'prescreened',
    lastTouchedDays: 3,
    tags: ['it-leadership', 'cxo'],
  },
  {
    id: 'c4',
    name: 'Diego Salazar',
    title: 'Director, AWS Cloud',
    company: 'Heliotrope Labs',
    score: 76,
    stage: 'replied',
    lastTouchedDays: 4,
    tags: ['tech', 'cloud'],
  },
  {
    id: 'c5',
    name: 'Janelle Brooks',
    title: 'Regional Director of Sales',
    company: 'Cordova Foods',
    score: 71,
    stage: 'replied',
    lastTouchedDays: 5,
    tags: ['restaurant', 'sales'],
  },
  {
    id: 'c6',
    name: 'Aaron Whitfield',
    title: 'Senior Integration Architect',
    company: 'Beacon Systems',
    score: 84,
    stage: 'outreach_sent',
    lastTouchedDays: 1,
    tags: ['tech', 'architecture'],
  },
  {
    id: 'c7',
    name: 'Sofia Henriquez',
    title: 'Account Executive',
    company: 'Drift IO',
    score: 67,
    stage: 'outreach_sent',
    lastTouchedDays: 2,
    tags: ['tech', 'sales'],
  },
  {
    id: 'c8',
    name: 'Trent Olafson',
    title: 'Director of Customer Success',
    company: 'Trellis CX',
    score: 73,
    stage: 'outreach_queued',
    lastTouchedDays: 0,
    tags: ['tech', 'cs'],
  },
  {
    id: 'c9',
    name: 'Imani Wells',
    title: 'Solutions Architect',
    company: 'Veracore',
    score: 79,
    stage: 'sourced',
    lastTouchedDays: 0,
    tags: ['tech', 'architecture'],
  },
  {
    id: 'c10',
    name: 'Ben Strickland',
    title: 'VP of Restaurant Operations',
    company: 'Burnside Grills',
    score: 70,
    stage: 'sourced',
    lastTouchedDays: 0,
    tags: ['restaurant', 'ops'],
  },
  {
    id: 'c11',
    name: 'Rachel Donovan',
    title: 'Director of Construction',
    company: 'Halverson Build',
    score: 65,
    stage: 'sourced',
    lastTouchedDays: 0,
    tags: ['construction', 'ops'],
  },
  {
    id: 'c12',
    name: 'Kenji Watanabe',
    title: 'Director of Engineering',
    company: 'Switchback Software',
    score: 86,
    stage: 'placed',
    lastTouchedDays: 12,
    tags: ['tech', 'engineering'],
  },
];

export type MockClient = {
  id: string;
  company: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  tier: 1 | 2 | 3;
  vertical: 'restaurant' | 'tech' | 'it' | 'finance' | 'construction' | 'other';
  lastContactDays: number;
  isFridayCallList: boolean;
};

export const MOCK_CLIENTS: MockClient[] = [
  {
    id: 'cl1',
    company: 'Jack in the Box',
    contactName: 'Sarah Jones',
    contactEmail: 'sarah.jones@example.com',
    contactPhone: '(858) 555-0142',
    tier: 1,
    vertical: 'restaurant',
    lastContactDays: 3,
    isFridayCallList: true,
  },
  {
    id: 'cl2',
    company: 'Del Taco',
    contactName: 'Mike Patel',
    contactEmail: 'mike.patel@example.com',
    tier: 1,
    vertical: 'restaurant',
    lastContactDays: 7,
    isFridayCallList: true,
  },
  {
    id: 'cl3',
    company: 'El Pollo Loco',
    contactName: 'Lauren Becker',
    contactEmail: 'lauren.becker@example.com',
    tier: 1,
    vertical: 'restaurant',
    lastContactDays: 10,
    isFridayCallList: true,
  },
  {
    id: 'cl4',
    company: 'Petco',
    contactName: 'David Chu',
    contactEmail: 'david.chu@example.com',
    tier: 2,
    vertical: 'other',
    lastContactDays: 14,
    isFridayCallList: false,
  },
  {
    id: 'cl5',
    company: 'GitLab',
    contactName: 'Aisha Khan',
    contactEmail: 'aisha.khan@example.com',
    tier: 1,
    vertical: 'tech',
    lastContactDays: 2,
    isFridayCallList: true,
  },
  {
    id: 'cl6',
    company: 'ODK Media',
    contactName: 'Todd Merz',
    contactEmail: 'todd.merz@example.com',
    tier: 2,
    vertical: 'tech',
    lastContactDays: 5,
    isFridayCallList: true,
  },
  {
    id: 'cl7',
    company: 'Encore Capital Group',
    contactName: 'Frank Garcia',
    contactEmail: 'frank.garcia@example.com',
    tier: 2,
    vertical: 'finance',
    lastContactDays: 21,
    isFridayCallList: false,
  },
  {
    id: 'cl8',
    company: 'Crave Hospitality',
    contactName: 'Jordan Ali',
    contactEmail: 'jordan.ali@example.com',
    tier: 3,
    vertical: 'restaurant',
    lastContactDays: 8,
    isFridayCallList: true,
  },
  {
    id: 'cl9',
    company: 'StoneArch Holdings',
    contactName: 'Maria Diaz',
    contactEmail: 'maria.diaz@example.com',
    tier: 2,
    vertical: 'it',
    lastContactDays: 4,
    isFridayCallList: true,
  },
  {
    id: 'cl10',
    company: 'Halverson Build',
    contactName: 'Chris Halverson',
    contactEmail: 'chris.halverson@example.com',
    tier: 3,
    vertical: 'construction',
    lastContactDays: 30,
    isFridayCallList: false,
  },
];

export type MockOutreachDraft = {
  id: string;
  candidateName: string;
  candidateTitle: string;
  candidateCompany: string;
  forRole: string;
  forClient: string;
  draftedAtMinutesAgo: number;
  subject: string;
  body: string;
};

export const MOCK_OUTREACH: MockOutreachDraft[] = [
  {
    id: 'd1',
    candidateName: 'Trent Olafson',
    candidateTitle: 'Director of Customer Success',
    candidateCompany: 'Trellis CX',
    forRole: 'VP of Customer Success',
    forClient: 'GitLab',
    draftedAtMinutesAgo: 12,
    subject: 'Quick question about your CS leadership work at Trellis',
    body: `Hi Trent,

Saw the post you wrote last month about scaling onboarding playbooks — the bit about pairing tech-touch with the high-value accounts is a tactic the team I'm hiring for is actively trying to build.

I'm working with a hyper-growth DevOps tools company that's looking for someone to head up Customer Success across their enterprise segment. They've placed ~$100M with Iconiq, NPS is strong, but the post-sale motion is too founder-led right now.

Worth a 15-min call this week to see if it's the kind of role you'd be open to hearing about?

— Peter`,
  },
  {
    id: 'd2',
    candidateName: 'Imani Wells',
    candidateTitle: 'Solutions Architect',
    candidateCompany: 'Veracore',
    forRole: 'Senior Solutions Architect',
    forClient: 'StoneArch Holdings',
    draftedAtMinutesAgo: 28,
    subject: 'StoneArch hiring a senior SA — your Veracore background lines up',
    body: `Hi Imani,

I'm running a search for StoneArch Holdings — they're standing up a multi-tenant integration platform for their portfolio companies, and they need a senior SA who's been through that kind of build before.

Your work at Veracore on the connector framework looks like exactly the kind of background they'd care about. The role is hands-on but the comp + equity reflect that they're hiring someone to actually own the stack.

Open to a quick chat next Tuesday or Wednesday?

— Peter`,
  },
  {
    id: 'd3',
    candidateName: 'Ben Strickland',
    candidateTitle: 'VP of Restaurant Operations',
    candidateCompany: 'Burnside Grills',
    forRole: 'Regional VP, Operations',
    forClient: 'Jack in the Box',
    draftedAtMinutesAgo: 47,
    subject: 'Regional VP role at Jack in the Box — wanted to put it in front of you',
    body: `Hi Ben,

Heard a lot of good things about how you took Burnside from 12 to 41 units without losing the kitchen culture — that's the kind of operator profile Jack in the Box is looking for as they fill a new regional VP slot covering the SoCal market.

This is a direct conversation with the Chief Restaurant Officer, not a posted req. Would you be open to a confidential chat before they go any wider on the search?

— Peter`,
  },
];

export type MockInboxMessage = {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  receivedMinutesAgo: number;
  classification: 'positive' | 'neutral' | 'negative' | 'ooo';
  candidateOrClient: string;
};

export const MOCK_INBOX: MockInboxMessage[] = [
  {
    id: 'm1',
    from: 'Alexis Tran',
    fromEmail: 'alexis.tran@example.com',
    subject: 'Re: Director of DevOps role — happy to chat',
    preview:
      "Hi Peter — yes, would love to learn more. I have time Wednesday at 2pm CT or Thursday at 10am CT. Let me know what works on your end…",
    receivedMinutesAgo: 18,
    classification: 'positive',
    candidateOrClient: 'Alexis Tran (candidate)',
  },
  {
    id: 'm2',
    from: 'Sarah Jones',
    fromEmail: 'sarah.jones@example.com',
    subject: 'Update on the regional VP search',
    preview:
      'Peter — thanks for sending the three submissions yesterday. The hiring committee wants to move forward with Ben and Marcus. Can we set up first-rounds for next week?',
    receivedMinutesAgo: 95,
    classification: 'positive',
    candidateOrClient: 'Sarah Jones — Jack in the Box',
  },
  {
    id: 'm3',
    from: 'Diego Salazar',
    fromEmail: 'diego.salazar@example.com',
    subject: 'Re: AWS Cloud Director opportunity',
    preview:
      "Appreciate the note — currently happy where I am but if anything tier-1 in the Bay Area pops up I'd be open to hearing more. Keep me on the list…",
    receivedMinutesAgo: 140,
    classification: 'neutral',
    candidateOrClient: 'Diego Salazar (candidate)',
  },
  {
    id: 'm4',
    from: 'Kenji Watanabe',
    fromEmail: 'kenji.watanabe@example.com',
    subject: 'Auto-reply: Out of office',
    preview:
      "I'm currently out of office through next Friday. For urgent matters please contact my deputy …",
    receivedMinutesAgo: 220,
    classification: 'ooo',
    candidateOrClient: 'Kenji Watanabe (candidate)',
  },
  {
    id: 'm5',
    from: 'Lauren Becker',
    fromEmail: 'lauren.becker@example.com',
    subject: 'New role — Director of Loyalty Programs',
    preview:
      "Peter — JD attached. We need someone with quick-service experience and a strong CRM background. Hoping to have first interviews within 2 weeks.",
    receivedMinutesAgo: 320,
    classification: 'positive',
    candidateOrClient: 'Lauren Becker — El Pollo Loco',
  },
];
