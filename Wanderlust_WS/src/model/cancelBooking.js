const connection= require( '../utilities/connections' );

const deleteBooking= {}

deleteBooking.cancelBooking= ( bookingId, userId, destinationId ) => {
    return connection.getBookingCollection().then( ( bookingCollection ) => {
        bookingCollection.deleteMany( {"bookingId": bookingId} ).then( ( bookingResponse ) => {
            if( bookingResponse ){
                return connection.getUserCollection().then( ( userCollection ) => {
                userCollection.update( {"userId": userId}, {$pull: {"bookings": bookingId}} ).then( ( userResponse ) => {
                    if( userResponse ){
                        return connection.getDestinationCollection().then( ( bcollection ) => {
                            return bcollection.find( {"destinationId": destinationId} ).then( ( destination ) => {
                                if( destination.length>0 ){
                                    return bcollection.update( {"destinationId": destinationId}, {$inc: {"availability": 1}} ).then( ( availability ) => {
                                        if( availability ){
                                            return"Booking cancelled";
                                        }
                                    } )
                                } else{
                                    return connection.getHotdealsCollection().then( ( hcollection ) => {
                                        return hcollection.find( {"destinationId": destinationId} ).then( ( hotdeals ) => {
                                            if( hotdeals ){
                                                return hcollection.update( {"destinationId": destinationId}, {$inc: {"availability": 1}} ).then( ( availability ) => {
                                                    if( availability ){
                                                        return"Booking cancelled";
                                                    }
                                                } )
                                            }
                                        } )
                                    } )
                                }
                            } )
                        } )                        
                    } else{
                        let err= new Error( "Booking cancellation Failed" )
                        err.status= 500;
                        throw err;
                    }
                } )
            } )
            }
        } )
    } )
}


module.exports= deleteBooking;