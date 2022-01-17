const connection = require('../utilities/connections')

const confirmBooking = {}

confirmBooking.setData = (bookingForm, checkCollection) => {
    if (checkCollection === "D") {
        return connection.getHotdealsCollection().then((hmodel) => {
            return hmodel.find({ "destinationId": bookingForm.deal.destinationId }).then((data) => {
                console.log("DATA", data[0])
                let availability = data[0].availability;
                if (availability < 1) {
                    let err = new Error("Deal Not Available");
                    throw err;
                } else {
                    return connection.getUserCollection().then((collection) => {
                        return collection.find({ "contactNo": bookingForm.contactNo }, { userId: 1 }).then((userid) => {
                            let userId = userid[0].userId;
                            return connection.getBookingCollection().then((collection) => {
                                return collection.distinct("bookingId").then((ids) => {
                                    if (ids.length >= 1) {
                                        console.log("IDS", ids)
                                        let lastid = ids.pop();
                                        let bId = Number(lastid.slice(1)) + 1
                                        let bookingId = 'B' + bId
                                        return collection.insertMany({
                                            "bookingId": bookingId, "userId": userId, "destId": bookingForm.deal.destinationId,
                                            "destinationName": bookingForm.deal.name, "checkInDate": bookingForm.date, "checkOutDate": bookingForm.checkOutDate,
                                            "noOfPersons": bookingForm.noOfPersons, "totalCharges": bookingForm.totalCharges, "timeStamp": new Date()
                                        }).then((data) => {
                                            if (data) {
                                                return connection.getUserCollection().then((collection) => {
                                                    return collection.updateOne({ "userId": userId }, { $push: { "bookings": bookingId } }).then((userData) => {
                                                        if (userData) {
                                                            return connection.getHotdealsCollection().then((model) => {
                                                                return model.updateOne({ "destinationId": bookingForm.deal.destinationId }, { $inc: { "availability": -1 } }).then(() => {
                                                                    return "BookingSuccessfull"
                                                                })
                                                            })
                                                        } else {
                                                            let err = new Error("Booking Failed")
                                                            err.status = 500
                                                            throw err
                                                        }
                                                    })
                                                })
                                            } else {
                                                let err = new Error("Booking Failed")
                                                err.status = 500
                                                throw err
                                            }
                                        })
                                    }
                                })
                            })

                        })
                    })
                }
            })
        })
    } else if (checkCollection === "H") {
        return connection.getDestinationCollection().then((dmodel) => {
            return dmodel.find({ "destinationId": bookingForm.deal.destinationId }).then((data) => {
                let availability = data[0].availability;
                if (availability < 1) {
                    let err = new Error("Deal Not Available");
                    throw err;
                } else {
                    return connection.getUserCollection().then((collection) => {
                        return collection.find({ "contactNo": bookingForm.contactNo }, { userId: 1 }).then((userid) => {
                            let userId = userid[0].userId;
                            return connection.getBookingCollection().then((collection) => {
                                return collection.distinct("bookingId").then((ids) => {
                                    if (ids.length >= 1) {
                                        let lastid = ids.pop();
                                        let bId = Number(lastid.slice(1)) + 1
                                        let bookingId = 'B' + bId
                                        return collection.insertMany({
                                            "bookingId": bookingId, "userId": userId, "destId": bookingForm.deal.destinationId,
                                            "destinationName": bookingForm.deal.name, "checkInDate": bookingForm.date, "checkOutDate": bookingForm.checkOutDate,
                                            "noOfPersons": bookingForm.noOfPersons, "totalCharges": bookingForm.totalCharges, "timeStamp": new Date()
                                        }).then((data) => {
                                            if (data) {
                                                return connection.getUserCollection().then((collection) => {
                                                    return collection.updateOne({ "userId": userId }, { $push: { "bookings": bookingId } }).then((userData) => {
                                                        if (userData) {
                                                            return connection.getDestinationCollection().then((model) => {
                                                                return model.updateOne({ "destinationId": bookingForm.deal.destinationId }, { $inc: { "availability": -1 } }).then(() => {
                                                                    return "BookingSuccessfull"
                                                                })
                                                            })
                                                        } else {
                                                            let err = new Error("Booking Failed")
                                                            err.status = 500
                                                            throw err
                                                        }
                                                    })
                                                })
                                            } else {
                                                let err = new Error("Booking Failed")
                                                err.status = 500
                                                throw err
                                            }
                                        })
                                    }
                                })
                            })
                        })
                    })
                }
            })
        })
    }
}

module.exports = confirmBooking;

