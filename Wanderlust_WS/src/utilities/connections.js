const{ Schema } = require( "mongoose" );
const Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/Wanderlust_DB";

let userSchema = Schema( {
    name: String,
    userId: String,
    emailId: String,
    contactNo: Number,
    password: String,
    bookings: [String],
    tokens: [{
        token: String
    }]
}, { collection: "User" } )

let bookingSchema = Schema( {
    bookingId: String,
    userId: String,
    destId: String,
    destinationName: String,
    checkInDate: Date,
    checkOutDate: Date,
    noOfPersons: Number,
    totalCharges: Number,
    timeStamp: Date
}, {collection: "Booking"} )

let destinationSchema = Schema( {
    destinationId: String,
    continent: String,
    imageUrl: String,
    name: String,
    details: { 
        about: String, 
        itinerary: { 
            dayWiseDetails: { 
                firstDay: String, 
                restDaysSightSeeing: [String], 
                lastDay: String
            }, 
            packageInclusions: [String], 
            tourHighlights: [String], 
            tourPace: [String] 
        } 
    },
    noOfNights: Number,
    flightCharges: Number,
    chargesPerPerson: Number,
    discount: Number,
    availability: Number
}, {collection: "Destination"} )

let hotdealsSchema = Schema( destinationSchema, {collection: "Hotdeals"} )

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true  } ).then( ( database ) => {
        return database.model( 'User', userSchema )
    } ).catch( (  ) => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getBookingCollection = () => {
    return Mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true  } ).then( ( database ) => {
        return database.model( 'Booking', bookingSchema )
    } ).catch( (  ) => {
        let err= new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getDestinationCollection = () => {
    return Mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true  } ).then( ( database ) => {
        return database.model( 'Destination', destinationSchema )
    } ).catch( (  ) => {
        let err= new Error( "Could not connect to Database" );
        err.status= 500;
        throw err;
    } )
}

collection.getHotdealsCollection = () => {
    return Mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true  } ).then( ( database ) => {
        return database.model( 'Hotdeals', hotdealsSchema )
    } ).catch( (  ) => {
        let err= new Error( "could not connect to Database" );
        err.status= 500;
        throw err;
    } )
}


module.exports = collection;