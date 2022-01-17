const connection= require('../utilities/connections');

const getDestinations= {};

getDestinations.getAlldestinations= ()=>{
    return connection.getDestinationCollection().then(collection =>{
        return collection.find().then(data =>{
            if(data){
                return data;
            }else{
                throw new Error("Database error");
            }
        })
    })
}

module.exports= getDestinations;