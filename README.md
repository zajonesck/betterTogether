# Better Together - Full Stack Application

Better Together is a comprehensive fitness application designed to bring trainers and clients closer to their fitness goals. As a fitness professional, you can use Better Together to track client weights and workouts over time effortlessly. This repository contains both the frontend UI built with Vue.js and the backend server developed with Node.js.

## Table of Contents

- [Local Development Overview](#local-development-overview)
- [Production Overview on AWS](#production-overview-on-aws)
- [Frontend - Better Together UI](#frontend---better-together-ui-vuejs)
- [Backend - Better Together API](#api---better-together-server-nodejs)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Deployments](#deployments)
- [Automated Tests](#automated-tests)
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

## Deployments

Frontend: Push to your `main` branch to deploy the app.
Backend: `Amplify push` will automatically trigger a new Amplify build.

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
