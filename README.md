# `POKEDEX PICKER`

## Description
Allows the user to scroll through Pokemons either one-by-one or selecting from a list in order to gather or remove favorites. The technologies used to achieve this were React for reusable components, Chakra-UI for styles, Node.js and Express.js to implement and use APIs, and postgreSQL to store favorites inside a database.

https://user-images.githubusercontent.com/46462294/154218582-387e9800-6b5c-407e-93ba-0376d54ce027.mp4

## How to Install and Run the Project
1. After cloning the project, delve into both _server_ and _client_ folders in order to `npm i` or `yarn install` to download the libraries.
2. To run the server, head into the server directory and type `node server.js`.
3. To run the client, head into the client directory and type `yarn start` or `npm start`.

**Now I know what you are thinking...the cards are blank. That is because I used an env to shield sensitive information regarding the database I have used.**

4. Make sure to have postgreSQL installed in order to complete the next step. This is optional if you wish to skip storing favorites for Pokemon. In order to skip this step, you must head over to _pokeDexFavorites.js_ under routes folder inside server directory and comment out the routers inside.

5. Create an env file that would fill in the info where you would see `process.env` in _database.js_ located inside server folder. The info needed includes the following:\
   user: process.env.USER,\
   password: process.env.DB_PASSWORD,\
   database: process.env.DB_NAME,\
   host: process.env.HOST,\
   port: process.env.PORT,
6. Finally, the table_name you have created in postgreSQL is needed inside the env as well as it would ask for the variable inside the APIs under the folder _routes_ in _pokeDexFavorites.js_.
