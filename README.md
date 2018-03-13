# Express API Boilerplate

[![Build Status](https://travis-ci.org/sudhirt4/express-api-boilerplate.svg?branch=master)](https://travis-ci.org/sudhirt4/express-api-boilerplate)
[![codecov](https://codecov.io/gh/sudhirt4/express-api-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/sudhirt4/express-api-boilerplate)

> Opinionated boilerplate reference codebase

## Setup

1. Install dependencies

   ```
   yarn install
   ```

2. Update common submodule

   ```
   git submodule update --init --recursive
   ```

3. Setup environment file

   ```
   cp .env.example .env
   ```

4. Replace with your environment variables in .env

5. Run migration

   ```
   yarn migrate
   ```

6. Start development server

   ```
   yarn start:dev
   ```

7. Setup test

   > Setup test database

   ```
   cp .env .env.test
   ```

   > Running test

   ```
   yarn test:watch
   ```
