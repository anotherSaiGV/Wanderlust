require('dotenv').config({path: '../.env'});
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

const myErrorLogger = require( './utilities/ErrorLogger' );
const myRequestLogger = require( './utilities/RequestLogger' );
const userRouter = require( './routes/userRouter' );
const bookingRouter = require( './routes/bookingRouter' );
const packageRouter = require( './routes/packageRouter' );
const PORT= process.env.PORT || 4000;

const app = express();
app.use( cors() );

app.use( bodyParser.json() );
app.use( myRequestLogger );
app.use( '/user', userRouter );
app.use( '/booking', bookingRouter );
app.use( '/package', packageRouter )
app.use( myErrorLogger );

app.listen( PORT );
console.log( `Server listening in port ${PORT}` );

module.exports = app;

 