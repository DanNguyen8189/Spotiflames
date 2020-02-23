# Server

## setup:

initilaize package.json with npm init -f

install nodemon (useful for continuously restarting the server)

`npm install --save nodemon eslint`

go to the package.json folder - in the script section, take out test and add these 2:

    "start": "node ./node_modules/nodemon/bin/nodemon.js src/app.js --exec \"npm run lint && node\"",
    "lint": "./node_modules/.bin/eslint **/*.js"

run this to initialize eslint:

`node ./node_modules/eslint/bin/eslint.js --init`

make new folder src, and inside it an app.js file

running npm start should start the server and execute whatever's in app.js

run
`npm install --save express body-parser cors morgan`

reccomended application to test out backend: postman

## Overview
When the user clicks to submit login info on the client side, the app will send them to the server, which in turn requests authorization from spotify (/login). Afterwards, we go to /callback, which upon sucess gets the access and refresh tokens for the user. The access token is appended to the URL. 

## Environment variables
These are used so that the client id and client secret are safely stored outside of github for security reasons.
Guide for using them: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786. They'll be located in the .env file in the root directory

## Production 
Note: environment variables in .env need to be altered
