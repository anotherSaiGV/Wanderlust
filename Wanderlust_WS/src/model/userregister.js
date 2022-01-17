const connection= require( '../utilities/connections' );

const userDB= {};

userDB.checkUser= ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.findOne( { "contactNo": contactNo} ).then( ( customerContact ) => {
            if( customerContact ){
                return customerContact
            } else{
                return null;
            }
        } )
    } )
}

userDB.registerUser= ( name, emailId, contactNo, hashPassword ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.distinct( "userId" ).then( ( ids ) => {
            let lastid= ids.pop();
            let bId=Number( lastid.slice( 1 ) )+1
            let userId='U'+bId
            return collection.insertMany( {"userId": userId, "name": name,"emailId": emailId, "contactNo": contactNo, "password": hashPassword} ).then( ( data ) => {
                if( data ) {
                    return data
                } else{
                    return null;
                }
            } )
        } )
        
    } )
}

module.exports= userDB