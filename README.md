# `POKEDEX PICKER`

## Description
Allows the user to scroll through Pokemon either one-by-one or selecting from a list in order to gather or remove favorites. The technologies used to achieve this were React for reusable components, Chakra-UI for styles, Node.js and Express.js to fetch and use APIs, and postgreSQL to store favorites inside a local database.

https://user-images.githubusercontent.com/46462294/155060579-6c832737-f80f-4812-9678-df78209c8ac8.mp4

## How to Install and Run the Project
1. After cloning the project, delve into both _server_ and _client_ folders in order to `npm i` or `yarn install` to download the libraries.
2. To run the server, head into the server directory and type `npm start`.
3. To run the client, head into the client directory and type `yarn start` or `npm start`.

**Now I know what you are thinking...the cards are blank. That is because I used an env to shield sensitive information regarding the database I have used.**

4. Make sure to have postgreSQL installed in order to complete the next step. This is optional if you wish to skip storing favorites for Pokemon. In order to skip this step, you must head over to _pokeDexFavorites.js_ under routes folder inside server directory and comment out the routers inside.

5. Head over to _database.sql_ under the _server_ directory and copy the content into the command line running postgreSQL in order to make the new database and table needed. 

6. Create an env file and fill the following:\
`DB_USER=`\
`DB_PASSWORD=`\
`DB_NAME=pokidex_favorites`\
`DB_PORT=`\
`DB_HOST=`\
`TABLE_NAME=favorites`

