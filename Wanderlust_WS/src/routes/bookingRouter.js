const express= require( 'express' );
const router= express.Router();
const setupBooking= require( '../model/setupBooking' );
const getBooking= require( '../model/getBooking' );
const deleteBooking= require( '../model/cancelBooking' )

router.get( "/setup", ( req, res, next ) => {
    setupBooking.bookingSetup().then( ( data ) => {
        res.send( data );
    } ).catch( ( err ) => {
        next( err );
    } )
} )

router.post( "/viewBooking", ( req, res, next ) => {    
    let contactNo= req.body.contactNo;
    getBooking.getDetails( contactNo ).then( ( data ) => {
        res.send( data );
    } ).catch( ( err ) => {
        next( err );
    } )
} )

router.post( "/cancelBooking", ( req, res, next ) => {
    let bookingId= req.body.bookingId;
    let userId= req.body.userId;    
    let destinationId= req.body.destinationId;
    deleteBooking.cancelBooking( bookingId, userId, destinationId ).then( ( response ) => {
        res.json( response )
    } ).catch( ( err ) => {
        next( err );
    } )
    
} )

module.exports = router;      
   