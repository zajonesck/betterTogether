#!/bin/bash

# Define the source and target directories
TARGET_DIR="./amplify/backend/function/betterTogetherApiResource/src/"
SRC_DIR="./src/"

# Remove all files in the target directory
rm -rf ${TARGET_DIR}*

# Use rsync to copy files to the target directory
rsync -av --exclude='path/to/exclude' ${SRC_DIR}* ${TARGET_DIR}

# Copy other necessary files
cp ./.env ./package.json ${TARGET_DIR}

echo "Copied code to package for lambda, now pushing to amplify"
# Push the changes to Amplify
# amplify push