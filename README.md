1. Framework: ExpressJS
2. ORM: Bookshelf 
3. Database: Postgres


# Notes: 

1. ES6 imports needs to be transpiled using babel into CommonJS
https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c

2. Used "babel-register" in knexfile.js to allow ES6 syntax in migration files
https://medium.com/@stubailo/how-to-write-knex-js-config-in-es2015-65b2376738f5



# Setup notes:

1. Copy ".env.example" as ".env" and replace with your configuration
2. npm install
3. npm run dev:start