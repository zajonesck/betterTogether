# Better Together - Full Stack Application

Better Together is a comprehensive fitness application designed to bring trainers and clients closer to their fitness goals. As a fitness professional, you can use Better Together to track client weights and workouts over time effortlessly. This repository contains both the frontend UI built with Vue.js and the backend server developed with Node.js.

## Table of Contents

- [Local Development Overview](#local-development-overview)
- [Production Overview on AWS](#production-overview-on-aws)
- [Frontend - Better Together UI](#frontend---better-together-ui-vuejs)
- [Backend - Better Together API](#api---better-together-server-nodejs)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Deployments](#deployments)
  - [Deployment Script: `deploy.sh`](#deployment-script-deploysh)
  - [Amplify Setup](#amplify-setup)
- [Automated Tests](#automated-tests)
- [Google Sign-In Integration](#google-sign-in-integration)
- [roles coming soon]

## Local Development Overview

- **UI**: Vue.js, running on `localhost:5173`
- **API**: Node.js, running on `localhost:3000`
- **Database**: PostgreSQL, running on `localhost:5431`

## Production Overview on AWS

- **UI**: Vue.js, accessible at [bettertogether.day](https://www.bettertogether.day/)
- **API**: Node.js, hosted by AWS Lambda functions accessed through API Gateway and available at `https://nn43xtyoif.execute-api.us-east-1.amazonaws.com`
- **Database**: PostgreSQL, hosted by AWS RDS and running on port `5432`
- **Secrets**: Secrets, managed by AWS Secret Manager

## Frontend - Better Together UI (Vue.js)

The frontend UI of Better Together is built using Vue.js and leverages Vite for the build process.

### Install app dependencies

```bash
$ cd ui
$ npm install
```

### Compile and hot-reload for development

```bash
$ npm run dev
```

### Compile and minify for production

```bash
$ npm run build
```

### Run UI tests using vitest

```bash
$ npm run test
```

For additional customization, see the [Vite Configuration Reference](https://vitejs.dev/config/).

## API - Better Together Server (Node.js)

### Compile and hot-reload for development

```bash
$ npm run start:watch
```

### Run tests

```bash
$ npm run test
```

### Example API requests

```bash
# Add a new client named "Big Boy Cope" with a birthday on "03/20/2016" to the production environment
$ curl -H "Content-Type: application/json" -X POST -d '{"client_name":"Big Boy Cope", "birth_day":"03/20/2016"}' https://nn43xtyoif.execute-api.us-east-1.amazonaws.com/clients

```

## Recommended IDE Setup

We recommend using [VSCode](https://code.visualstudio.com/) with the following extensions for the best development experience:

- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (Remember to disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## Deployment

## Deployment Script: `deploy.sh`

---

#### Overview

The `deploy.sh` script automates the deployment process for the BetterTogether application, handling pre- and post-deployment tasks for backend functions.

#### Prerequisites

- Execution permissions.
- Node.js, npm, and AWS Amplify CLI installed and configured.

#### Usage Instructions

1. **Start Deployment**: Execute `./deploy.sh`.
2. **Copy Files**: Clears and copies necessary files to `./amplify/backend/function/betterTogetherApiResource/src`.
3. **Install Dependencies**: Installs production dependencies in the `src` directory.
4. **Temporary Fix**: Replaces `package-lock.json` to address Amplify build issues.
5. **Push to AWS Amplify**: Updates Amplify environment with new changes.
6. **Completion Confirmation**: Outputs success message upon completion.

#### Notes

- Includes a temporary workaround for an issue with `package-lock.json`.

### Amplify Setup

- Install the AWS Amplify CLI:

```bash
$ npm install -g @aws-amplify/cli
```

- Configure the Amplify CLI:

```bash
$ amplify configure
```

- Check Amplify status:

```bash
$ amplify status
```

- View Amplify logs: To view the logs for a specific Amplify function or resource, you can use the amplify console command. For instance, if you want to view logs for a Lambda function:

```bash
$ amplify console function
```

## Amazon Cognito and JWT Token Verification

Amazon Cognito is leveraged in the application to provide authentication and authorization. Users authenticate through Cognito and receive a JWT (JSON Web Token) which is then used to verify and grant access to certain parts of the application.

### How JWT Tokens are used:

- Once a user is authenticated, they are provided with a JWT token by Cognito.
- This token is sent in the Authorization header for requests made to the server.
- Before processing the request, the server verifies the JWT token's validity.
  - For local and test environments, a test JWT token is used. This test JWT is fetched from AWS Secret Manager.
  - For other environments, the JWT token is verified against the Cognito JWKS (JSON Web Key Set) endpoint.

### Role Definitions:

1. **Admin**: This role has access to all functions within the application, allowing them to view, modify, delete, and manage all data. They can manage user accounts, view all client data, and perform any administrative tasks required.
2. **User (coming soon)**: This role is for the client, allowing them to view only their data. They can't modify or delete any data, and their scope is limited to their own personal information, weight, workouts, etc.

## AWS Secret Manager in Database and Tests:

AWS Secret Manager is utilized to securely store and retrieve secrets required for the application. For instance:

- The test JWT token, used for local and test environments, is fetched from AWS Secret Manager.
- Database secrets and configurations can also be stored and fetched securely using AWS Secret Manager.

## Automated Tests

Testing is crucial for ensuring the reliability and stability of the application. In this project, automated tests have been set up to make the validation process more efficient. Ensure all dependencies are installed and the application's environment is set up correctly for the tests to run without issues.

### Tools Used for API Testing

- **Jest**: A JavaScript Testing Framework with a focus on simplicity.
- **Supertest**: Provides a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.

### Tools Used for UI Testing

- **vitest**: Vitest is a unit-test framework tailored for Vite, utilizing Vite's dev server for file transformations and offering rapid testing with features like Hot Module Reload (HMR). With a Jest-compatible API, it emphasizes performance and developer experience, aiming to be the preferred test runner for Vite projects.

### How Tests Work

Jest acts as the test runner, providing an environment to execute our tests. With Supertest, we can easily make HTTP requests to our API and assert the responses, making it suitable for testing RESTful services. vitest acts as the test runner and framework for Vite.

### Running the Tests

```API
$ npm run test
```

```UI
$ npm run test
```

## Google Sign-In Integration with AWS Amplify

This section details the integration of Google Sign-In with AWS Amplify for the Better Together application.

### Overview

Google Sign-In provides users with a convenient and secure authentication method. This integration enhances user experience by allowing login with Google accounts.

### Integration Steps

- Configured AWS Cognito for Google authentication.
- Registered the application in Google Developer Console for client credentials.
- Updated AWS Amplify configuration for Google as a social identity provider.
- Implemented the Google Sign-In button in the frontend.

### Tutorial Reference

The setup followed this AWS Knowledge Center tutorial: [AWS Google Federation Tutorial](https://repost.aws/knowledge-center/cognito-google-social-identity-provider).

### Notes

This documentation serves as a reference for future updates or troubleshooting related to Google Sign-In integration.
