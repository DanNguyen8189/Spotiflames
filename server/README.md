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
