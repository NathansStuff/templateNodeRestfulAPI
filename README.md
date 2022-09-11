# Template for a Node RESTful API with Mern

## Overview

Create a reusable template that we can use to kickstart any future RESTful API

Comes with the following features:

-   MongoDB Node RESTful API
    -   Connected to MongoDB
    -   Two Models
        -   Full User Model
        -   Basic Pokemon Model
            -   Pokemons linked to Users
    -   User Authorization & Authentication
        -   JWT
    -   Custom Error Handler
    -   Typescript
    -   Eslint & Prettier Config
    -   Pre Commit Hooks with Husky
    -   Postman Collection Starter file
    -   Modularized into
        -   Routes
        -   Controllers
        -   Services
        -   Sanitizers
        -   Types
        -   Models
        -   Schema
        -   Middleware
        -   Database
        -   Utils

# Helpful Commands

-   npm run dev
-   npm run lint-fix

# Steps

1. Clone the repo
2. Create a MongoDB
3. Create a .env file based on the .env.sample file
4. npm install
5. Import the postman collection and test it with `npm run dev`
    1. Do not test the create Pokemon command
    2. OR drop the DB after you test it
6. Update the PokemonsSchema and PokemonsTypes files
7. Update the PokemonsSanitizer
    1. Important to do properly
    2. Can be done quickly through assuming data is valid
    3. After this, we are good to go!
8. Rename Pokemons => Pokemon
    1. (or whatever name) with CTRL+SHIFT+H for infile names
    2. Rename filenames manually
    3. Ensure that the names are correct, particularly with lower case s and capital S in Schema and Sanitizers
9. Check isUserAuthorized inside pokemonService.ts line as follows:
   ` if (sanitizedUserId !== PokemonToUpdate.userId) {`
10. Rename services from eg, deletePokemon to deletePokemon
