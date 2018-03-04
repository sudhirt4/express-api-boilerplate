# Express API Boilerplate

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

   * Replace with your environment variables in .env

4. Run migration

   ```
   yarn migrate
   ```

5. Start development server

   ```
   yarn dev:start
   ```
