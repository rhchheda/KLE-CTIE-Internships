# KLE-CTIE Internship Portal — Setup

Google Apps Script project. No secrets or environment-specific IDs live in
this source tree — everything below is configured via **Script Properties**
(Apps Script editor → Project Settings → Script Properties), so this repo
is safe to keep in Git regardless of who else has access to it.

## 1. Get the code into an Apps Script project

This folder is a plain checkout, not wired to any specific Apps Script
project yet — `.clasp.json` is gitignored on purpose, since it just points
at *one* script ID and everyone who clones this repo (or redeploys it)
points it at their own.

### Overwriting an existing script project (this project's case)

```
npm install -g @google/clasp
clasp login
```

Get the target script's ID: open it in the Apps Script editor → Project
Settings → Script ID (or read it out of the editor's URL:
`https://script.google.com/d/<SCRIPT_ID>/edit`).

Point this folder at that script — **don't** run `clasp clone` here, it
tries to download the remote project into an empty folder and will refuse
since `appsscript.json` already exists locally. Instead create `.clasp.json`
by hand, with your script ID in place of the placeholder:

Git Bash / macOS / Linux:
```
cat > .clasp.json <<'EOF'
{"scriptId":"PASTE_YOUR_SCRIPT_ID_HERE","rootDir":"."}
EOF
```
Windows PowerShell:
```
'{"scriptId":"PASTE_YOUR_SCRIPT_ID_HERE","rootDir":"."}' | Out-File -Encoding utf8 .clasp.json
```

Preview what will change, then force-push (overwrites every file in the
Apps Script project with what's in this folder, no confirmation prompt):
```
clasp status
clasp push -f
```

Two things `clasp push` does **not** do:
- It won't delete a remote file that has no local counterpart (e.g. an old
  `.gs`/`.html` file from a previous version that you've since removed here).
  Check the Apps Script editor's file list after pushing and delete any
  stragglers by hand.
- It reads `.claspignore` (already set up in this repo) to skip everything
  that isn't an Apps Script file — `assets/*.png`, `SETUP.md`, `.git`, etc.
  Apps Script only understands `.gs`, `.html`, and the `appsscript.json`
  manifest; anything else would make the push fail.

After pushing: **you're recreating the Google Sheet manually**, so once
that's done, set `SHEET_ID` in Script Properties to its ID (Project Settings
→ Script Properties) and run `setupSheets()` from the editor before anyone
uses the portal — see the Script Properties table below for everything else
that needs setting.

### Fresh project instead

```
clasp create --type webapp --title "KLE-CTIE Internship Portal"
clasp push -f
```

### Manual (no clasp)

Create a new Apps Script project, then copy in `Code_production.gs`,
`SeedData.gs`, `appsscript.json`, and all `*.html` files (paste each HTML
file's contents into a file of the same name, without the `.html` in the
Apps Script file name field).

## 2. Script Properties (required)

| Key | Value | Notes |
|---|---|---|
| `SHEET_ID` | Your Google Sheet's ID | **Required.** The app throws a clear error until this is set. |
| `RESUME_FOLDER_ID` | Drive folder ID | Where uploaded resumes are stored. Falls back to Drive root if unset. |
| `PORTAL_URL` | Your deployed `/exec` URL | Recommended — avoids a `/dev` URL leaking into emails before you set it. |
| `TBI_SHEET_ID` | Sheet ID of the parent TBI tracker | Optional — only needed if you want completed-internship counts synced upstream. |

Admin PIN is **not** a Script Property you set yourself — see below.

## 3. Logos

**Web pages:** ship embedded in source, not Google Drive. The actual PNGs
live in `assets/kle-logo.png` and `assets/ctie-logo.png`; `Code_production.gs`
embeds them as base64 (`KLE_LOGO_B64` / `CTIE_LOGO_B64`, near the top of the
file) and `buildPage_` uses those by default. Nothing to configure — logos
just work as soon as this code is deployed.

To replace a logo: swap the file in `assets/`, then regenerate the base64
constant:
```
python -c "import base64; print(base64.b64encode(open('assets/kle-logo.png','rb').read()).decode())"
```
and paste the result into `KLE_LOGO_B64` (or `CTIE_LOGO_B64`) in
`Code_production.gs`. Keep logos small (a few hundred px tall is plenty —
they're only ever displayed at ~30-36px) since the base64 string is
inlined into every page load.

If you'd rather not touch code, the Admin Settings page has an optional
**Logo Override** field (`kle_logo_url` / `ctie_logo_url` Script Properties)
that takes priority over the embedded default when set — paste any public
image URL there instead.

**Emails** are a separate, smaller concern: `LOGO_KLE_URL` / `LOGO_CTIE_URL`
Script Properties (no UI yet). Embedding base64 images in email HTML is
unreliable across mail clients (Gmail/Outlook often strip inline data-URI
images), so emails intentionally keep using a real hosted URL — set these to
a public image URL (e.g. a GitHub raw link, if this repo is public) if you
want a logo in outgoing emails; otherwise they fall back to a plain-text
"KLE TECH" / "CTIE" wordmark.

## 4. First run

1. In the Apps Script editor, run `setupSheets()` then `setupTriggers()`.
2. Run `seedAll()` (from `SeedData.gs`) if you want dry-run data.
3. Deploy → New deployment → Web app → **Execute as: Me**, **Who has access: Anyone**.
4. Set `PORTAL_URL` (Script Properties) to the resulting `/exec` URL.
5. Open the portal's `?page=Admin` and log in — **the first PIN anyone
   enters becomes the permanent admin PIN** (hashed and stored in Script
   Properties automatically). Do this yourself immediately after deploying,
   before sharing the URL with anyone else. Startup PINs work the same way,
   per-startup, on first login.

## Security model, briefly

- Every privileged action (startup dashboard, admin reports, etc.) requires
  a session token issued by `startupLogin`/`adminLogin` and validated
  server-side on every call (`resolveSession_`) — the client never gets to
  assert "I am startup X" or "I am admin" without a token proving it.
- Sessions live in `CacheService` for 6 hours (sliding), not in the Sheet —
  logging out or letting a session expire simply invalidates the token.
- This is still a shared-PIN model, not per-user accounts — anyone with a
  startup's PIN acts as that startup, and whoever claims the admin PIN first
  is the admin. That's a deliberate simplicity trade-off for a small internal
  tool, not an oversight, but it's worth knowing before scaling this up.
