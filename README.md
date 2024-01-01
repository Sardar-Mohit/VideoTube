// Bigger Picture

> npm i mongoose dotenv express  
> created environment variables in .env file like mongdb_url and port
> created index.js in db folder to connect db
> create constant like db_name so if you want to change your db_name you can change it once and it will be updated everywhere
> add this in package.json because dotenv doesn't support import but supports require and you cant use require because you have set type equals module ("scripts": { "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js" })

// Connecting db
import mongoose and constant(your db)
create a function with async await
connect mongoose with await because you server is in another contitent so it takes time
wrap it in try catch and give meaningful arrors in catch so that you can debug easily

// Index.js
import your db connecting function
import dotenv for your .env files because express doesn't support it automatically you have to update it manually
config dotenv (dotenv.config())
call the imported function




// Next Video tasks :
import express and configure/listen it in the index.js as connectdb then and catch
npm i cors and cookie-parser
add cors in app.js as middleware also add its origin with env 
add middleware to express to allow only 16kb json from user
add middleware to express to encode url with extended and 16kb limit 
add middleware to express to save static files in public folder
add middleware to of cookie-parser

