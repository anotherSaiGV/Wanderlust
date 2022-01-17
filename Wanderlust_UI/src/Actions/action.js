let actObj= {}

actObj.bookingPackage= (deal, form, persons, outdate, continent) => {
    return{
        type: "SENDBOOKINGDEAL",
        bookingPackage: deal,
        bookingForm: form,
        totalCharges: persons,
        checkOutDate: outdate,
        continent: continent
    }
}

actObj.checkCollection= (checkCollection) =>{
    return{
        type: "SETCOLLECTION",
        checkCollection: checkCollection
    }
}

export default actObj;