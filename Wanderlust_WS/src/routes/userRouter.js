const express = require( 'express' );
const router = express.Router();
const setupUser = require( "../model/setupUser" )
const loginService = require( '../service/userslogin' )
const registerservice= require( '../service/userregister' )
const confirmBooking= require( '../service/confirmBooking' )

router.get( "/setup", ( req, res, next ) => {
    setupUser.userSetup().then( ( data ) => {
        res.send( data )
    } ).catch( err => next( err ) );
} )

//router to login
router.post( '/login', function ( req, res, next ) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    loginService.login( parseInt( contactNo ), password ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( err => next( err ) );
} )

router.post( '/register', function ( req, res, next ) {    
    let name= req.body.name;
    let emailId= req.body.emailId;
    let contactNo= req.body.contactNo;
    let password= req.body.password;
    registerservice.register( name, emailId, parseInt( contactNo ), password ).then( ( response ) => {
        res.json( response );
    } ).catch( ( err ) => {
        next( err );
    } )
} )

router.post( '/confirmBooking', function ( req, res, next ){
    let bookingForm= req.body.bookingForm;   
    let checkCollection= req.body.checkCollection;      
    confirmBooking.setData( bookingForm, checkCollection ).then( ( response ) => {   
        if( response ){
            res.json( response )
        }
    } ).catch( ( err ) => {
        next( err );
    } )    
} )

module.exports = router; 