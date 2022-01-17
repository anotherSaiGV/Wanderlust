const connection= require( '../utilities/connections' );

const hotdeals= {};

hotdeals.getHotdeals= () =>{
    return connection.getHotdealsCollection().then(collection =>{
        return collection.find().then(data =>{
            if(data){
                return data;
            }else{
                throw new Error("Database error")
            }
        })
    })
}

module.exports= hotdeals