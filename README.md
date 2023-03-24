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


To create a Udemy-like SaaS platform with the added feature of leveraging the ChatGPT API to generate unique content based on users' learning progress, you would need to design a few data models and processes to ensure a smooth user experience. Here's a high-level overview of the data models and the sequence of determining content for a user when they log in:

Data Models:

User Model: Stores user-related information such as name, email, password, and user type (instructor or student).

Course Model: Stores course-related information such as title, description, instructor, categories, and status (published or unpublished).

Topic Model: Stores topic-related information for each course, such as title, description, weight, and course reference.

Progress Model: Stores user progress information, including user reference, course reference, topic reference, score, and completion status.

Progress History Model: Stores a history of user progress over time, including user reference, course reference, topic reference, score, completion status, and timestamp.

Content Model: Stores content-related information for each topic, such as text, images, videos, and other media.

Sequence to Generate Content:

Authenticate the user and fetch their information.
Fetch the list of courses associated with the user (either enrolled courses for students or created courses for instructors).
For a selected course, fetch the topics and their associated weights.
Retrieve the user's progress and progress history for the selected course.
Determine the topic to focus on based on the user's progress and topic weighting.
Fetch the content associated with the chosen topic.
Use the ChatGPT API to generate additional, unique content based on the user's progress, topic, and fetched content.
Return the generated content to the user.
By following this high-level approach, you can create a learning platform that tailors content to users' progress, making it more personalized and engaging.