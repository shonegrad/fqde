# Development Rules & Standards

> [!IMPORTANT]
> These rules are non-negotiable. They must be followed on every run, every change, and every deployment.

## 0. Prerequisites
- **Git Versioning**: This project uses git from day one.
- **GitHub Connection**: Must be connected to `https://github.com/nebojsadespotovic/fqde.git`.
- **Target**: Deployments target GitHub Pages `gh-pages` branch.

## 1. Port & Process Hygiene
**Never start duplicate instances.**

Before starting `npm run dev` or any server:
1. **Check Ports**: Verify if the app is already typically running (checking ports 5173, 5174, etc).
   ```bash
   lsof -i :5173
   ```
2. **Reuse**: If an instance exists, **use it**. Do not spin up a second one unless explicitly debugging concurrency.
3. **Kill**: If a process is orphaned (running but not accessible), kill it safely:
   ```bash
   kill <PID>
   ```

## 2. Browser Hygiene
**Never spam tabs.**

1. **Check**: Is the app already open in a browser tab?
2. **Reuse**: Switch to that tab. Reload it.
3. **Open New**: Only if the existing tab is unrecoverable or a different environment is needed.

## 3. Versioning System
**Single Source of Truth**: `package.json` -> `version` field.

- **Display**: The current version must be visible in the application UI (e.g., Footer).
- **Format**: SemVer (`MAJOR.MINOR.PATCH`).
- **Sync**: The version in `package.json` drives the git tag and the release name.

## 4. Deployment Workflow (The "Commit + Push" Chain)
Whenever a version bump or deployment is requested, you **MUST** use the automated script.
**Command**: `npm run deploy`

This script enforces:
1. **Dirty Check**: Fails if there are uncommitted changes.
2. **Build**: Runs `npm run build` to verify integrity.
3. **Tag**: Creates a git tag `vX.Y.Z` matching `package.json`.
4. **Push**: Pushes code and tags to GitHub.
5. **Deploy**: Deploys the build to GitHub Pages.

> [!WARNING]
> Do not manually `git push` a release without tagging it. Do not deploy a broken build.

## 5. Agent Checklist
*Always perform these checks before starting work:*

- [ ] **Repo**: Is `origin` correct? (`git remote -v`)
- [ ] **Port**: Is the app already running? Re-use it.
- [ ] **Tab**: Is the app open? Re-use it.
- [ ] **Version**: Does `package.json` version match the UI?
- [ ] **Validation**: Run a build/test cycle before major changes.

## 6. Troubleshooting / Known Issues
- **Localhost Port**: If `5173` is busy, Vite uses `5174`, `5175`, etc. Check terminal output.
- **Deploy Failures**: If `npm run deploy` fails on "Dirty Tree", stash or commit your changes first.
