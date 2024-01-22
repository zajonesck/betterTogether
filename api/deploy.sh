#!/bin/bash

# Pre-deployment tasks
echo "Starting deployment..."

# Copy files
rm -rf ./amplify/backend/function/betterTogetherApiResource/src/*
cp ./package.json ./amplify/backend/function/betterTogetherApiResource/src/
cp -r ./src/* ./amplify/backend/function/betterTogetherApiResource/src/
cp ./.env ./amplify/backend/function/betterTogetherApiResource/src/

# Navigate to src directory and run npm install
cd ./amplify/backend/function/betterTogetherApiResource/src/
npm install --production 
cd -

# This is a hack that i need to fix soon since amplify rebuilds my package-lock and makes my lambda function too big to deploy
cp ./package-lock-copy.json ./amplify/backend/function/betterTogetherApiResource/src/package-lock.json

# Push the changes to Amplify
amplify push
# Post-deployment tasks
echo "Deployment completed successfully."
