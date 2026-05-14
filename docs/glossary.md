# Glossary

Terms used throughout this codebase, alphabetized.

| Term | Meaning |
|---|---|
| **Agent SDK** | Anthropic's Claude Agent SDK — framework we use for orchestrating Claude with tool use and sub-agents |
| **Apollo** | apollo.io — B2B contact enrichment service Peter pays for; we use its REST API |
| **Atlas** | MongoDB Atlas — managed MongoDB; M0 free tier (512MB) → M2 ($9/mo) when needed |
| **Atlas Vector Search** | MongoDB's vector-index feature; one of two candidates for our vector layer |
| **Auth.js** | New name for NextAuth — handles OAuth/login in Next.js |
| **Basic dyno** | Heroku's $7/mo tier — does NOT sleep, unlike the Eco tier |
| **BD** | Business Development — Phase 5 — outreach to NEW potential clients |
| **brand voice** | Peter's writing style — captured from his real emails (PII-scrubbed) and stored in `knowledge/wiki/brand-voice.md` |
| **DKIM / DMARC / SPF** | Email authentication standards that determine deliverability. Set up on `outreach.plattpartners.com` |
| **DPA** | Data Processing Agreement — Apollo's contract that makes Peter a joint controller of enriched data |
| **Entra** | Microsoft's identity service (formerly Azure AD) — Peter's M365 login goes through here |
| **Forget endpoint** | `POST /api/candidates/:id/forget` — GDPR/CCPA delete-everything endpoint |
| **HIL** | Human-in-the-Loop — Peter approves AI-drafted outreach before it sends |
| **ICP** | Ideal Customer Profile — Phase 5 BD targeting definitions |
| **JD** | Job Description |
| **1-Click Export** | LinkedIn Recruiter's sanctioned export-to-CSV button. The ONLY way candidate data enters our system from LinkedIn. |
| **MERN** | MongoDB + Express + React + Node — Ryan's preferred stack (we adapted to Next.js for SEO) |
| **Microsoft Graph** | Microsoft's unified API for M365 — used for mail send/receive, OneDrive, Calendar |
| **Next.js Pages Router** | Next.js's file-based routing using `pages/`. Stable, simpler than App Router; what we use |
| **OneDrive watch folder** | `/PlattPartners/LinkedIn-Exports/` on Peter's OneDrive; MS Graph subscription fires our webhook on new uploads |
| **parent-document retrieval** | RAG pattern: embed small chunks, return the surrounding parent section to the LLM for better context |
| **PII** | Personally Identifiable Information — candidate names, emails, phones, resumes |
| **Pinecone** | Hosted vector database; one of two candidates for our vector layer |
| **prescreen** | Pre-interview phone screen Peter does with candidates before submitting to client |
| **Procfile** | Heroku's process declaration file |
| **RPO** | Recruitment Process Outsourcing — one of Peter's service-line names |
| **shadcn/ui** | Component library; we copy the components into our codebase rather than installing as a package |
| **Site Kit** | Google's WordPress plugin that connects GA + Search Console to WP; currently installed on plattpartners.com with a deprecated UA tracking ID |
| **Sonnet, Haiku** | Claude model tiers — Sonnet for high-quality drafting; Haiku for cheap classification |
| **source_id** | Unique ID on every chunk in the vector store, cited in assistant responses so we know what knowledge was used |
| **TERRL** | Tenant External Recipient Rate Limit — Microsoft's daily cap on external recipients |
| **trust_level** | Metadata on every chunk (1=lowest, 3=highest). Public widget filters to trust_level ≥ 2 |
| **Voyage** | voyageai.com — embeddings provider; we use `voyage-3-lite` |
| **Warmup** | Gradual ramp of sending volume on a new email domain to build sender reputation. ~3 weeks for `outreach.plattpartners.com` before real cold outreach |
| **WP** | WordPress (current site, being migrated OFF in Phase 1) |
