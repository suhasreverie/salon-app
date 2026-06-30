#!/bin/bash
set -e

echo "Building all frontends..."

# In a pnpm workspace, we can just run the root build script
# However, if any script fails due to ignore-scripts, we force build
pnpm run build

echo "Done building frontends."
