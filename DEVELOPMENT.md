# Development Rules & Standards

> [!IMPORTANT]
> **These rules are NON-NEGOTIABLE.** They must be followed on every session, every code change, and every deploy.
> This file is designed to be reusable across projects. Replace `<PLACEHOLDER>` values with project-specific details.

---

## 📋 ALWAYS-RUN CHECKLIST (Every Session)

Before doing anything else, complete this checklist:

- [ ] **1. Verify repo + remote**
  ```bash
  git status
  git remote -v
  ```
- [ ] **2. Check if app is already running** (ports/processes)
  ```bash
  lsof -i :5173
  ```
- [ ] **3. Reuse existing browser tab** if available
- [ ] **4. Confirm current version** (local file + UI display match)
- [ ] **5. Make changes**
- [ ] **6. Validate** (build/smoke test before commit)
  ```bash
  npm run build
  ```
- [ ] **7. Commit + push + deploy** (when requested, follow Section H)
- [ ] **8. Verify live version matches** (check deployed URL + version display)

---

## Section A: Project Metadata

| Field | Value |
|-------|-------|
| **Project Name** | connecting-educators |
| **Primary Repo** | https://github.com/shonegrad/fqde.git |
| **Default Branch** | master |
| **Deployment Method** | GitHub Pages via `gh-pages` branch (using `gh-pages` npm package) |
| **Live URL** | https://shonegrad.github.io/fqde/ |
| **Local Dev URL** | http://localhost:5173/fqde/ |
| **Version Source** | `package.json` → `version` field + `.version` file |

### Placeholders for Reuse
```
Project Name:       <PROJECT_NAME>
Primary Repo:       <GITHUB_REPO_URL>
Default Branch:     <main|master>
Deployment Method:  <gh-pages branch | /docs | GitHub Actions>
Live URL:           <GITHUB_PAGES_URL>
Local Dev URL:      <http://localhost:PORT>
```

---

## Section B: Always-Run Checklist (Detailed)

Every session, follow these steps **in order**:

### 1. Verify Repository & Remote
```bash
# Check current branch and status
git status

# Verify remote points to correct GitHub repo
git remote -v
# Expected: origin  https://github.com/<USER>/<REPO>.git (fetch/push)
```

### 2. Check if App is Already Running
```bash
# Check if dev server is running on expected port
lsof -i :5173

# If running, note the PID and reuse it
# If not running, you may start a new instance
```

### 3. Reuse Existing Browser Tab
- Check if a browser tab is already open to the app URL
- **Reuse it** — do not open a new tab
- Reload if necessary

### 4. Confirm Current Version
- Check `.version` or `package.json` version field
- Verify the UI displays the same version
- If mismatch, investigate before proceeding

### 5. Make Changes
- Implement the requested feature/fix
- Follow coding standards

### 6. Validate Before Commit
```bash
# Run build to ensure no errors
npm run build

# Or run project-specific validation:
# <INSERT_VALIDATION_COMMAND>
```

### 7. Commit + Push + Deploy
- See **Section H** for the full workflow

### 8. Verify Live Version Matches
- Visit the live URL
- Confirm the displayed version matches your commit

---

## Section C: Prerequisites (Non-Negotiable)

> [!CAUTION]
> Do not skip these. They must be true before any work begins.

### Git from Day One
- This repo **must** use git version control from the start
- All code changes must be committed with meaningful messages

### GitHub Connection
- GitHub must be connected using existing credentials/config
- Verify with:
  ```bash
  git remote -v
  # Should show: origin  https://github.com/<USER>/<REPO>.git
  ```

### Origin Remote Verification
- Before pushing, always verify origin is correct
- If origin is wrong:
  ```bash
  git remote set-url origin https://github.com/<USER>/<REPO>.git
  ```

### GitHub Pages Configuration
- **Method Used**: `gh-pages` branch (via `gh-pages` npm package)
- Alternative methods (document which is used):
  - `gh-pages` branch ← **CURRENT**
  - `/docs` folder on main branch
  - GitHub Actions workflow
- Verify in GitHub repo: Settings → Pages → Source

---

## Section D: Port and Process Hygiene (No Duplicates)

> [!WARNING]
> **NEVER start a duplicate dev server instance.**

### The Rule
Before starting any dev server:
1. Check whether the app is already running
2. Identify which port it's using
3. If a running instance exists, **reuse it** — do NOT start a second instance
4. If a new port is required, document why and stop old processes cleanly

### Commands for macOS/Linux

#### List All Listening Ports
```bash
# Using lsof (macOS/Linux)
lsof -i -P -n | grep LISTEN

# Using ss (Linux)
ss -tulnp

# Using netstat (older systems)
netstat -tulnp
```

#### Find a Specific Port
```bash
# Check if port 5173 is in use
lsof -i :5173

# Check a range of ports
lsof -i :5173-5180
```

#### Stop a Process Safely
```bash
# Get the PID from lsof output, then:
kill <PID>

# If process doesn't stop gracefully (wait 5 seconds first):
kill -9 <PID>

# Kill by port (use with caution)
lsof -ti :5173 | xargs kill
```

#### Quick One-Liner: Check Before Starting
```bash
# If port is free, this returns nothing; if busy, shows process
lsof -i :5173 || echo "Port 5173 is free"
```

### Expected Dev Server Ports
| Service | Primary Port | Fallback Ports |
|---------|--------------|----------------|
| Vite Dev Server | 5173 | 5174, 5175, ... |
| Vite Preview | 4173 | 4174, 4175, ... |

---

## Section E: Browser Hygiene (Reuse Tabs)

> [!WARNING]
> **NEVER spam browser tabs with duplicate app instances.**

### The Rule
When opening the app in a browser:
1. **Check** if there is already an open tab for the app
2. **Reuse** the existing tab whenever possible
3. **Reload** the tab if content is stale

### Only Open a New Tab If:
- Wrong environment (e.g., need production but have localhost open)
- Wrong URL/route that cannot be navigated to
- Stale session that cannot be refreshed (authentication issues)
- Explicitly debugging multiple instances

### Implementation for Agents
```
Before opening browser:
1. List open tabs
2. Search for tabs matching: localhost:5173, localhost:5174, or production URL
3. If found → switch to that tab and reload
4. If not found → open new tab
```

---

## Section F: Versioning System (Single Source of Truth)

### The Rule
- Use **SemVer**: `MAJOR.MINOR.PATCH`
- Maintain a **single source of truth** for version

### Version Source of Truth
| File | Purpose |
|------|---------|
| `package.json` → `version` | Primary source, used by npm and build tools |
| `.version` | Backup/alternate source for scripts |

### Version Must Be Displayed in UI
- **Location**: Footer, Settings page, or About section
- **Requirement**: The displayed version **must match** the source file

### Version Sync Requirements
The version must match across:
- [ ] Local `package.json` (or `.version`)
- [ ] Git commit/tag (`vX.Y.Z`)
- [ ] GitHub repository
- [ ] GitHub Pages live site (UI display)

### How to Update Version
```bash
# Option 1: Edit package.json manually
# Change "version": "X.Y.Z"

# Option 2: Use npm version (auto-commits)
npm version patch  # 0.1.0 → 0.1.1
npm version minor  # 0.1.0 → 0.2.0
npm version major  # 0.1.0 → 1.0.0
```

### How the UI Reads Version (No Hardcoding!)
```javascript
// ❌ BAD - Hardcoded
const version = "0.1.0";

// ✅ GOOD - Read from package.json or environment variable
import { version } from '../package.json';
// or
const version = import.meta.env.VITE_APP_VERSION;
```

---

## Section G: Validation Rules (Never Deploy Broken Builds)

### The Rule
Before committing for deployment or running any commit+push+deploy workflow:
1. **Run validation** (build or smoke test)
2. If validation **fails**, block commit/deploy and fix first
3. Never push code that doesn't build

### Validation Command
```bash
# For this project:
npm run build

# Generic placeholder:
# <INSERT_VALIDATION_COMMAND>
```

### Validation Checklist
- [ ] `npm run build` completes without errors
- [ ] No TypeScript/ESLint errors (if applicable)
- [ ] App loads in browser without console errors
- [ ] Core functionality works (quick smoke test)

### If Validation Fails
1. **STOP** — do not commit or deploy
2. Read error messages carefully
3. Fix the issue
4. Re-run validation
5. Only proceed when validation passes

---

## Section H: Commit + Push + Deploy Workflow

> [!IMPORTANT]
> **Follow this exact order. Do not skip steps.**

### The Workflow

#### Step 1: Update Version (if warranted)
```bash
# Determine version bump type:
# - patch: bug fixes, minor changes
# - minor: new features, non-breaking
# - major: breaking changes

# Update package.json version
npm version patch --no-git-tag-version
# or edit manually

# Verify UI will display new version
```

#### Step 2: Validate (Build/Smoke Test)
```bash
npm run build
# Must complete without errors
```

#### Step 3: Git Status Sanity Check
```bash
git status
# Review changed files
# Confirm only intended files are staged
```

#### Step 4: Commit with Meaningful Message
```bash
git add .
git commit -m "feat: description of changes (vX.Y.Z)"
```

#### Step 5: Push to GitHub
```bash
git push origin master
```

#### Step 6: Deploy to GitHub Pages
```bash
npm run deploy
# or
./scripts/deploy.sh
```

#### Step 7: Verify Live Site
1. Wait 1-2 minutes for GitHub Pages to update
2. Visit live URL: https://shonegrad.github.io/fqde/
3. Confirm:
   - [ ] Site loads correctly
   - [ ] Version displayed matches intended version
   - [ ] New changes are visible

### Blocking Rules

#### Dirty Tree Protection
```bash
# If working tree is dirty and request is "deploy":
git status
# Shows uncommitted changes → BLOCK DEPLOYMENT

# Action: Commit changes first, then deploy
git add .
git commit -m "message"
# Then continue with deploy
```

#### Deploy Failure Handling
- If deployment fails, capture error output
- Record under **Section J: Troubleshooting**
- Fix the issue before retrying

### Quick Deploy Script
For this project, use:
```bash
npm run deploy
# This runs: ./scripts/deploy.sh
```

---

## Section I: Smart Additions

### Release Tags on Version Changes
```bash
# After updating version and committing:
git tag v0.1.0
git push --tags

# Or tag and push in one command:
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

### CHANGELOG.md Maintenance
- Keep a lightweight `CHANGELOG.md`
- Add one short entry per version bump
- Format:
  ```markdown
  ## [0.1.0] - 2024-12-14
  - Added: Feature X
  - Fixed: Bug Y
  - Changed: Behavior Z
  ```

### Single Deploy Script/Command
Prefer a single command for deployment:
```bash
# Recommended
npm run deploy

# Or use a dedicated script
./scripts/deploy.sh
```

### Dirty Tree Protection After Deploy
After deployment completes:
```bash
git status
# Must show: "nothing to commit, working tree clean"

# If dirty, investigate what changed and commit or discard
```

### Post-Deploy Verification Checklist
- [ ] Live URL loads: https://shonegrad.github.io/fqde/
- [ ] No console errors in browser
- [ ] Version displayed matches intended version
- [ ] Key features work correctly

### Documentation Updates
> [!TIP]
> Before commit+push, ensure documentation is updated comprehensively.

- Update README.md if features changed
- Update CHANGELOG.md with version entry
- Update inline code comments if behavior changed

---

## Section J: Troubleshooting / Known Issues

### Deployment Failures

| Symptom | Cause | Fix | Notes |
|---------|-------|-----|-------|
| "Dirty tree" error | Uncommitted changes | `git add . && git commit -m "message"` | Always commit before deploy |
| "Permission denied" on deploy.sh | Script not executable | `chmod +x ./scripts/deploy.sh` | Run once |
| gh-pages push fails | Auth issues | Check GitHub credentials | May need to re-authenticate |
| 404 on live site | Build not deployed | Re-run `npm run deploy` | Wait 1-2 min for propagation |
| Old version showing | Browser cache | Hard refresh (Cmd+Shift+R) | Or clear cache |
| Build fails | Code errors | Fix errors, re-run `npm run build` | Check terminal output |

### Port Conflicts

| Symptom | Cause | Fix | Notes |
|---------|-------|-----|-------|
| "Port 5173 already in use" | Another process on port | `lsof -ti :5173 \| xargs kill` | Check what's using it first |
| Vite starts on 5174 | Port 5173 busy | Use 5174 or kill 5173 process | Vite auto-increments |
| Cannot connect to localhost | Server not running | Start with `npm run dev` | Check terminal |
| EADDRINUSE error | Orphaned node process | `killall node` (careful!) | May kill other node apps |

### Git Issues

| Symptom | Cause | Fix | Notes |
|---------|-------|-----|-------|
| Push rejected | Remote has changes | `git pull --rebase` then push | Resolve conflicts if any |
| Wrong remote URL | Misconfigured origin | `git remote set-url origin <URL>` | Verify with `git remote -v` |
| Tag already exists | Duplicate version | Delete tag: `git tag -d vX.Y.Z` | Then recreate |

### Version Mismatch

| Symptom | Cause | Fix | Notes |
|---------|-------|-----|-------|
| UI shows old version | Cache issue | Hard refresh browser | Cmd+Shift+R |
| package.json != UI | Version not read correctly | Check import/env variable | See Section F |
| Tag != package.json | Forgot to update | Update and re-tag | Keep in sync |

---

## Appendix: Command Reference

### Git Commands
```bash
git status                    # Check working tree status
git remote -v                 # Verify remote URLs
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git push origin master        # Push to master branch
git tag vX.Y.Z                # Create version tag
git push --tags               # Push all tags
```

### Port/Process Commands
```bash
lsof -i :5173                 # Check if port 5173 is in use
lsof -i -P -n | grep LISTEN   # List all listening ports
kill <PID>                    # Stop process gracefully
kill -9 <PID>                 # Force stop process
```

### npm Commands
```bash
npm run dev                   # Start dev server
npm run build                 # Build for production
npm run preview               # Preview production build
npm run deploy                # Deploy to GitHub Pages
npm version patch             # Bump patch version
npm version minor             # Bump minor version
npm version major             # Bump major version
```

---

## Template Version

This development rules template is designed to be reusable across projects.
Replace all `<PLACEHOLDER>` values in Section A with project-specific details.

**Template Version**: 1.0.0
**Last Updated**: 2024-12-14
