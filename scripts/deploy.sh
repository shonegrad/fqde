#!/bin/bash

# Ensure we exit on any error
set -e

# 1. Check for dirty tree
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Error: Git working directory is dirty. Please commit or stash changes before deploying."
  exit 1
fi

# 2. Extract version from package.json
VERSION=$(node -p "require('./package.json').version")
echo "🚀 Deploying version v$VERSION..."

# 2a. Sync .version file with package.json (single source of truth)
echo "$VERSION" > .version
echo "📋 Synced .version file to $VERSION"

# 3. Build the project
echo "📦 Building project..."
npm run build

# 4. Tag the release
TAG_NAME="v$VERSION"

if git rev-parse "$TAG_NAME" >/dev/null 2>&1; then
  echo "⚠️  Tag $TAG_NAME already exists. Skipping tagging."
  # Optional: You might want to fail here if you strictly enforce version bumps
else
  echo "🏷️  Tagging release $TAG_NAME..."
  git tag "$TAG_NAME"
  git push origin "$TAG_NAME"
  echo "✅ Tag $TAG_NAME pushed."
fi

# 5. Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
# We use gh-pages to push the dist folder to the gh-pages branch
npx gh-pages -d dist

echo "🎉 Deployment complete! Site should be live at https://shonegrad.github.io/fqde/"
