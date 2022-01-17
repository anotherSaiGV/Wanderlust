const connection= require( '../utilities/connections' );

const getBooking= {}

getBooking.getDetails= ( contactNo ) => {
    return connection.getUserCollection().then( ( UserCollection ) => {
        return UserCollection.find( {"contactNo": contactNo} ).then( ( data ) => {
            let userId= data[0].userId;
            return connection.getBookingCollection().then( ( bookingCollection ) => {
                return bookingCollection.find( {"userId": userId} ).then( ( data ) => {
                    if( data ){
                        return data
                    } else{
                        return null
                    }                    
                } )
            } )            
        } )
    } )
}

module.exports= getBooking;  