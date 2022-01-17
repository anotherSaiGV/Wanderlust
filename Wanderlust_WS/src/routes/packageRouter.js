const express= require( 'express' );
const router= express.Router();

const setupDestination= require( '../model/setupDestination' );
const setupHotdeals= require( '../model//setupHotdeals' );
const getHotdeals= require( '../model/getHotdeals');
const getDestinations= require( '../model/getAlldestinations');

const dbModel= require( '../utilities/connections' )


router.get( '/setupDestination', ( req, res, next ) => {
    setupDestination.destinationSetup().then( ( data ) => {
        res.send( data );
    } ).catch( ( err ) => {
        next( err );
    } )
} )

router.get( '/setupHotdeals', ( req, res, next ) => {
    setupHotdeals.hotdealsSetup().then( ( data ) => {
        res.send( data );
    } ).catch( ( err ) => {
        next( err );
    } )
} ) 

router.get( '/hotdeals', ( req, res, next ) => {
    return getHotdeals.getHotdeals().then( ( data ) => {
        if(data){
            res.send(data);
        }
    } ).catch((err)=> {
        next(err);
    })
} )

router.get('/allDestinations', (req, res, next)=>{
    return getDestinations.getAlldestinations().then((data) =>{
        if(data){
            res.send(data);
        }
    }).catch(err=> {
        next(err);
    })
})

// return model.find({"name": {$regex: ".*(" +cont+ ").*"}}).then((destination) => {

router.get( '/destinations/:continent', ( req, res, next ) =>{   
    let params= req.params.continent;
    let cont= params.charAt( 0 ).toUpperCase() + params.slice( 1 ).toLowerCase()   
    return dbModel.getDestinationCollection().then( ( model ) => {
        return model.find( {"name": {$regex: ".*(" +cont+ ").*"}} ).then( ( destination ) => {
            if( destination ){
                res.send( destination )
            }
        } ).catch( ( err ) => {
            next( err );
        } )
    } )
} )

module.exports= router;