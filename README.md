# KLE-CTIE Internship Portal

**A single portal connecting classrooms to incubated startups.**

KLE-CTIE connects engineering and management students with CTIE-incubated startups for structured, accountable, SLA-protected internships — no scattered emails, no applications disappearing into silence, no manual tracking.

## 🚀 Get started

| I'm a... | Do this |
|---|---|
| 🎓 **Student** | [**Browse open roles →**](<PASTE-YOUR-PORTAL-URL-HERE>?page=Browse) — no account needed, apply with your institute email |
| 🏢 **Startup** | [**Post a role →**](<PASTE-YOUR-PORTAL-URL-HERE>?page=StartupPortal) — CTIE issues your login |
| 📋 **Anyone with an Application ID** | [**Track your application →**](<PASTE-YOUR-PORTAL-URL-HERE>?page=Track) |
| 🧭 **Curious how it all works** | [**See the full walkthrough →**](docs/index.html) |

*(Repo maintainer: replace `<PASTE-YOUR-PORTAL-URL-HERE>` above with your deployed `/exec` URL before publishing.)*

## What it does

- **Students** browse open roles with no account needed, apply with their institute email, and track every stage of their application from one link — from "Applied" through interview, offer, and a verified completion certificate.
- **Startups** post roles, manage their entire applicant pipeline, schedule interviews, and log weekly intern progress from one dashboard.
- **CTIE** gets real-time oversight of every startup's hiring activity, automatic SLA enforcement (nothing sits unanswered for long — the system nudges, then auto-closes if a startup goes quiet), and exportable reports.
- Already open to students from **any** institute, not just KLE — any institutional email is accepted, only personal addresses (Gmail, Yahoo, etc.) are excluded.

Built entirely on Google Sheets + Apps Script — the data never leaves the Institute's own Google Workspace, no third-party server involved.

<br>

# ⛔ Stop here unless you're building or deploying this

Everything above is for people using the portal. Everything below is source code documentation for developers.

---

## For developers

### Setup & deployment

Full instructions — Script Properties required, the `clasp` push/deploy workflow, and the security model — are in [`SETUP.md`](SETUP.md). Short version: every secret (Sheet ID, admin PIN, resume folder) lives in Script Properties, never in this source tree, so this repo is safe to keep public regardless of who's looking at it.

### A note on the HTML files in this repo

The 13 `.html` files here are **not standalone static pages** — they're Google Apps Script `HtmlService` templates, full of server-side scriptlets (`<?= EXEC_URL ?>`, `<?!= PAGES_JSON ?>`, etc.) that only resolve correctly when served by `Code_production.gs`'s `doGet()` router. Opening one directly in a browser won't work — they only function through a live Apps Script deployment. The table below is a reference for what each file does, not a set of clickable pages.

| File | Role | Route |
|---|---|---|
| `InternHome.html` | Public landing page (the portal's own home page) | `?page=Home` (or bare URL) |
| `InternBrowse.html` | Browse open roles, apply | `?page=Browse` |
| `InternTrack.html` | Track an application by ID; view/replace resume | `?page=Track&appId=...` |
| `InternOTPVerify.html` | Confirm an offer via one-time code | `?page=OTPVerify&appId=...` |
| `StartupProfile.html` | Public profile page for one startup | `?page=Profile&id=...` |
| `HelpStudent.html` / `HelpStartup.html` / `HelpAdmin.html` | Role-specific guides | `?page=Help*` |
| `StartupPortal.html` | Startup dashboard (PIN login) | `?page=StartupPortal` |
| `PostRole.html` | Post a new internship role | `?page=PostRole` |
| `AdminDashboard.html` | CTIE admin dashboard (PIN login) | `?page=Admin` |
| `AdminSettings.html` | Portal configuration | `?page=AdminSettings` |
| `Reports.html` | Analytics & CSV export | `?page=AdminReports` |

Navigation between these pages happens entirely server-side + client-JS at runtime, driven by the `PAGES_JSON` object `Code_production.gs` injects into every page — not by any link structure in this repo.

### Server code

- `Code_production.gs` — the entire application: routing, authentication (session tokens, hashed PINs), the SLA engine, email notifications, resume handling.
- `SeedData.gs` — populates dry-run test data (5 startups, 8 roles, 12 applications across every status) via `seedAll()`.
- `appsscript.json` — the Apps Script manifest (needed for `clasp`).

### The `docs/` folder

Unlike the portal's own HTML files, `docs/index.html` (the walkthrough linked above) **is** a genuinely standalone static page — it works via GitHub Pages if enabled (Settings → Pages → Source → `/docs`).

---

Made with ❤ ~rhc · EE Lab, KLE-CTIE
