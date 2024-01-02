// Conneting db

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

// Wrappers || Utils
//AsyncHandler
create arrow function with function as parameter (requestHandler)=>{}
create another arrow function in the above function with req,res,next
create promise with resolve and catch as callbacks
in catch get error from params and use next function wuth the err params next(err)
in resolve call the function that we get as a parameter while creating the wrapper(requestHandler) call that with the req,res,next params
//ApiResponse
create class with name of ApiResponse
create constructor with statusCode, data and message = "success"
now in the paranthesis over ride the values like (this.data = data)
//ApiError
create class with name ApiError extend it with class Error(it is inbuilt class by nodejs)
create constructor with statusCode,message="Something went wrong",errors=[] and statck = ""
now in paranthesis call super with message as param // calling super becuase to we have to update it anyhow
now over ride the values like (this.message = message) with extra values like this.success = false; this.data = null; also over ride them
now create if else for statck with statck as if condition if (statck) // we are over riding statck to get the correct message find the problem
over ride the statck here // this.statck = statck;
in else write it // Error.captureStackTrace(this, this.constructor);

// UserModel :

Create mongoose schema with relevent fields videoFile,thumbnail,title,description,duration,isPublished,views, owner, timestamps
create video model
npm i mongoose-aggregate-paginate-v2
import the above package and use it as schema plugin in video file

// Password Hashing :
// hashing :
import bcrypt to hash password before saving
use schema with pre method with save argument to hash password before saving it (userSchema.pre("save", fn ))
in the callback function make it async with next param
check if password field is updated or not if not then return next so it doesn't perform further tasks
if updated access password field with this.password
which equals with bcrypt.hash func provide this.password with rthe number for rounds of hashing like 10 ,8 (this.password = await bcrypt.hash(this.password, 10);)
return next
// Unhashing // to check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
return await bcrypt.compare(password, this.password);
};

// JsonWebToken : // to create access token and refresh tokens
// Access Token
userSchema.methods.generateAccessToken = function () {
return jwt.sign( // jwt Sign method is used to login in any account
{
\_id: this.\_id,
username: this.username,
fullname: this.fullname,
email: this.email,
} // Payload is used to compare the data and singin the user to its account
,
process.env.ACCESS_ACCESS_SECRET, // Createing access Token
{
expiresIn: process.env.ACCESS_ACCESS_EXPIRY, // Telling access Token Expiry
}
);
};

// Refresh Token
userSchema.methods.generateRefreshToken = function () {
return jwt.sign(
{
\_id: this.\_id,
},
process.env.ACCESS_REFRESH_SECRET,
{
expiresIn: process.env.ACCESS_REFRESH_EXPIRY,
}
);
};

<!-- Routers and controllers  -->

in app.js we have defined a middleware route that will be activated every time so that we dont have to create multiple routes and polute the file

a common route is deined as a middleware in the app.js so that we dont polute the file by creating multiple routes in the app.js
that route will redirect you to the user.routes.js file that have different routes
like /register if the user go to register route it will perform the especific task that task is writtem in the user.controllers.js
means every time user will go to any route middleware will be activated in app.js it will redirect the program to the routes file according the link that user want to visit the program will choice the route and in that route the task is mentioned and that task is writtem in the controllers we import the controller and use it as a callback
///////////// Link ///////////// Controller
router.route("/register").post(registerUser);

controller // Task
route // That user visited and has controller in it
middleware // it will redirect the program from app.js to routes.js so that the code is not poluted
