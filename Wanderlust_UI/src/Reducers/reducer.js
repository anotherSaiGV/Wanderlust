let initial_state= {
    bookingPackage: "",
    bookingForm:"",
    totalCharges:0,
    checkOutDate: new Date(),
    continent: "",
    checkCollection: ""
}

let bookingReducer= (state= initial_state, action) => {
    switch(action.type){
        case "SENDBOOKINGDEAL":
            return{
                ...state, 
                bookingPackage: action.bookingPackage,
                bookingForm: action.bookingForm,
                totalCharges: action.totalCharges,
                checkOutDate: action.checkOutDate,
                continent: action.continent,
            }
            break;
        case "SETCOLLECTION":
            return{
                ...state,
                checkCollection: action.checkCollection
            }
            break;
        default: return state;
    }
}

export default bookingReducer;