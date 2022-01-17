import React, { Component } from 'react';
import {backendUrlPackage} from '../BackendURL';
import axios from 'axios';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputSwitch } from 'primereact/inputswitch';
import actionObj from '../Actions/action';
import {Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const dummyData = [
    {
        "destinationId" : "D1001",
        "continent":"Europe",
        "imageUrl":"assets/geece.jpg",
        "name" : "A Week in Greece: Athens, Mykonos & Santorini",
        "details" : {
            "about" : "Watch the setting sun from the hilltops of Greece's most famous islands.Experience ancient history and open-air museums in the capital of Athens. Then, the quintessential, beautiful Greek islands you’ve been dreaming of come to life on the isles of Mykonos and Santorini.",
            "itinerary" : {
                "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Athens.",
                        "restDaysSightSeeing":[
                                                "Santorini",
                                                "Acropolis", 
                                                "Parthenon", 
                                                "Temple of Apollo", 
                                                "Ruins of Olympia", 
                                                "Ancient Theater of Epidaurus"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "7 nights in handpicked hotels", 
                    "7 breakfasts", 
                    "3 dinners with beer or wine", 
                    "3 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Greece",
                    "Athens",
                    "Mykonos",
                    "Santorini",
                    "Acropolis", 
                    "Parthenon", 
                    "Temple of Apollo", 
                    "Ruins of Olympia", 
                    "Ancient Theater of Epidaurus", 
                    "Corinth Canal photo stop"
                ],
                "tourPace" : [ 
                    "On this guided tour, you will walk for about 2 hours daily across uneven terrain, including paved roads and unpaved trails, with some hills and stairs."
                ]
            }
        },
        "noOfNights" : 7.0,
        "flightCharges":500,
        "chargesPerPerson" : 2499.0,
        "discount" : 0.0,
        "availability":30
    }, 
    {
        "destinationId" : "D1002",
        "continent":"Europe",
        "imageUrl":"assets/romantic.jpg",
        "name" : "Romantic Europe: Paris, Venice & Vienna",
        "details" : {
            "about" : "Get swept away by the beauty of Europe’s most romantic cities.Journey through the dazzling imperial capitals of France, Italy, Slovenia, and Austria, soaking up each destination’s unique culture along the way. Sip coffee in charming cafes, spend your days exploring the grand boulevards or admiring sparkling canals, and watch each city’s skyline light up every evening.",
            "itinerary" : {
                 "dayWiseDetails":{
                        "firstDay":"Travel day: Board your overnight flight to Paris.",
                        "restDaysSightSeeing":[
                                                "Vienna",
                                                "Eiffel Tower photo stop", 
                                                "The Grand Canal", 
                                                "St. Mark’s Square", 
                                                "Ljubljana’s Prešeren Square", 
                                                "Graz’s Old Town"
                                            ],
                        "lastDay":"Departure:Transfer to the airport for your flight home."
                },
                "packageInclusions" : [ 
                    "10 nights in handpicked hotels", 
                    "10 breakfasts", 
                    "4 dinners with beer or wine", 
                    "4 guided sightseeing tours", 
                    "Expert tour director & local guides", 
                    "Private deluxe motor coach"
                ],
                "tourHighlights" : [ 
                    "Paris",
                    "Venice",
                    "Vienna",
                    "Eiffel Tower photo stop", 
                    "The Grand Canal", 
                    "St. Mark’s Square", 
                    "Ljubljana’s Prešeren Square", 
                    "Graz’s Old Town", 
                    "Schönbrunn Palace"
                ],
                "tourPace" : [ 
                    "On this guided tour, you’ll walk for about 2.5 hours daily across mostly flat terrain, including paved roads and cobblestone streets, with some hills and stairs."
                ]
            }
        },
        "noOfNights" : 10.0,
        "flightCharges":500,
        "chargesPerPerson" : 2729.0,
        "discount" : 0.0,
        "availability":30
    }]



class StaticPackage extends Component {

    constructor(props){
        super(props);
        this.state = {
            bookingForm: {
                noOfPersons: 0,
                date: "",
                flights: true
            },
            bookingFormErrorMessage: {
                noOfPersons: "",
                date: "",
                flights: ""
            },
            bookingFormValid:{
                noOfPersons: false,
                date: false,
                buttonActive: false
            },
            hotdeals: [],
            boookActive: false,
            errorMessage: "",
            index: "",
            showItinerary: false,
            deal: "" ,
            dealId: "",
            bookingPage: false,
            totalCharges: "" ,
            checkOutDate: "",
            continent: "",
            contact: sessionStorage.getItem("contactNo") 
        }
    }

    hotDeals = () => {
        axios.get(backendUrlPackage+'/allDestinations').then((response) => {
            this.setState({hotdeals: response.data})           
        }).catch((error) => {
            this.setState({hotDeals: dummyData})        
        })
    }

    componentDidMount = () => {
        this.hotDeals();
        const continent = sessionStorage.getItem("continent");
        this.setState({continent: continent});
    }

    displayPackages = () => {
        if (!this.state.errorMessage) {
            let packagesArray = [];
            for (let mypackage of this.state.hotdeals) {
                let name = mypackage.imageUrl.split("/")[2]
                let element = (
                    <div className="card bg-light text-dark package-card" key={mypackage.destinationId}>
                        <div className="card-body row">
                            <div className="col-md-4">
                                <img className="package-image" src={require("../../public/assets/" + name)} alt="destination comes here" />
                            </div>
                            <div className="col-md-5">
                                <div className="featured-text text-center text-lg-left">
                                    <h4>{mypackage.name}</h4>
                                    <div className="badge badge-info">{mypackage.noOfNights}<em> Nights</em></div>
                                    {mypackage.discount ? <div className="discount text-danger">{mypackage.discount}% Instant Discount</div> : null}
                                    <p className="text-dark mb-0">{mypackage.details.about}</p>
                                </div>
                                <br />

                            </div>
                            <div className="col-md-3">
                                <h4>Prices Starting From:</h4>
                                <div className="text-center text-success"><h6>{'\u20B9'}{mypackage.chargesPerPerson}/per</h6></div><br /><br />
                                <div><button className="btn btn-primary book" onClick={() => this.getItinerary(mypackage)}>View Details</button></div><br />
                                <div><button className="btn btn-primary book" onClick={() => this.openBookingUp(mypackage)}>Book </button>  </div>
                            </div>
                        </div>
                    </div>
                )
                packagesArray.push(element);
            }
            return packagesArray;
        }
    } 

    displayPackageHighlights = () => {
        let packageHighLightsArray = [];
        if (this.state.deal) {            
            let firstElement = (
                <div key={0}>
                    <h3>Day Wise itinerary</h3>
                    <h5>Day 1</h5>
                    {this.state.deal ? <div>{this.state.deal.details.itinerary.dayWiseDetails.firstDay}</div> : null}
                </div>
            );
            packageHighLightsArray.push(firstElement);
            this.state.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((packageHighlight,index)=>{
                    let element=(
                        <div key={index+1}>
                            <h5>Day {this.state.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.indexOf(packageHighlight) + 2}</h5>
                            <div>{packageHighlight}</div>
                        </div>
                    );
                    packageHighLightsArray.push(element)
                });
            let lastElement = (
                <div key={666}>
                    <h5>Day {this.state.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.length + 2}</h5>
                    {this.state.deal.details.itinerary.dayWiseDetails.lastDay}
                    <div className="text-danger">
                        **This itinerary is just a suggestion, itinerary can be modified as per requirement. 
                        <a href="#contact-us">Contact us</a> for more details.
                    </div>
                </div>
            );
            packageHighLightsArray.push(lastElement);
            return packageHighLightsArray;
        } else {
            return null;
        }
    }

    displayPackageInclusions = () => {
        const packageInclusions = this.state.deal.details.itinerary.packageInclusions;
        if(this.state.deal) {
            return packageInclusions.map((pack,index)=> (<li key={index}>{pack}</li>) )
        }
        else {
            return null;
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        if(target.checked) {
            var value = target.checked;
        } else {
            value = target.value;
        }
        const { bookingForm } = this.state;
        this.setState({
            bookingForm: { ...bookingForm, [name]: value }
        });
    
        this.validateField(name, value);

    }

    validateField = (fieldname, value) => {
        let fieldValidationErrors = this.state.bookingFormErrorMessage;
        let formValid = this.state.bookingFormValid;
        switch (fieldname) {
            case "noOfPersons":
                if (value === "") {
                    fieldValidationErrors.noOfPersons = "This field can't be empty!";
                    formValid.noOfPersons = false;
                } else if (value < 1 ) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be less than 1";
                    formValid.noOfPersons = false;
                } else if (value > 5) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be more than 5";
                    formValid.noOfPersons = false;
                } else {
                    fieldValidationErrors.noOfPersons = "";
                    formValid.noOfPersons = true;
                }
                break;
            case "date":
                if (value === "") {
                    fieldValidationErrors.date = "This field can't be empty!";
                    formValid.date = false;
                } else {
                    let checkInDate = new Date(value);
                    let today = new Date();
                    if (today.getTime() > checkInDate.getTime()) {
                        fieldValidationErrors.date = "Check-in date cannot be a past date!";
                        formValid.date = false;
                    } else {
                        fieldValidationErrors.date = "";
                        formValid.date = true;
                    }
                }
                break;
            default:
                break;
        }
     
        formValid.buttonActive = formValid.noOfPersons && formValid.date;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    calculateCharges = () => {
        this.setState({ totalCharges: 0 });
        let oneDay = 24 * 60 * 60 * 1000;
        let checkInDate = new Date(this.state.bookingForm.date);
        let checkOutDateinMs = Math.round(Math.abs((checkInDate.getTime() + (this.state.deal.noOfNights) * oneDay)));
        let finalCheckOutDate=new Date(checkOutDateinMs);
        this.setState({ checkOutDate: finalCheckOutDate.toDateString() });
        if (this.state.bookingForm.flights) {
            let totalCost = (-(-this.state.bookingForm.noOfPersons)) * this.state.deal.chargesPerPerson + this.state.deal.flightCharges;
            this.setState({ totalCharges: totalCost });
        } else {
            let totalCost = (-(-this.state.bookingForm.noOfPersons)) * this.state.deal.chargesPerPerson;
            this.setState({ totalCharges: totalCost });
        }
    }
    
    getItinerary = (aPackage) => {
        this.setState({ index: 0, deal: aPackage, showItinerary: true })
    };
    openBookingUp = (aPackage) => {
        this.setState({ index: 2, deal: aPackage, showItinerary: true })
    };

    openBooking= (selectedPackage, bookingForm, totalCharges, checkOutDate, continent) => {
        this.setState({ visibleRight: false });
        let dealId= selectedPackage.destinationId;
        sessionStorage.setItem('noOfPersons', this.state.bookingForm.noOfPersons);
        sessionStorage.setItem('checkInDate', this.state.bookingForm.date);
        sessionStorage.setItem('flight', this.state.bookingForm.flights);
        sessionStorage.setItem('dealId', dealId);       
        
        this.setState({ bookingPage: true, showItinerary: false, dealId: dealId })   
        this.storeFunction(selectedPackage, bookingForm, totalCharges, checkOutDate, continent);               
    }
    storeFunction= (selectedPackage, bookingForm, totalCharges, checkOutDate, continent) => {
        let dealId= selectedPackage.destinationId;
        let action= actionObj.bookingPackage(selectedPackage, bookingForm, totalCharges, checkOutDate, continent);
        
        this.props.store.dispatch(action);
    }

    handleSubmit = (event) => {
        this.setState({boookActive: true})
        event.preventDefault();
        this.calculateCharges();
    }

    render() { 
        if(this.state.bookingPage){
            if(this.state.contact==null){
                alert("Please Login to book deals")
                return(                    
                    <Redirect to={"/login"} />
                )
            }
            else{
                return(
                    <Redirect to={{pathname: "/book/" + this.props.bookingPackage.destinationId, state: { deal: "H"}}} />                    
                )
            }            
        }else{
        return (
            <div> 
                <div>
                    {this.displayPackages()}
                </div>
                <Sidebar visible={this.state.showItinerary} position="right" className="p-sidebar-lg" onHide={(e) => this.setState({ showItinerary: false })}>
                    <h2>{this.state.deal.name}</h2>
                    <TabView activeIndex={Number(this.state.index)} onTabChange={(e) => this.setState({ index: e.index })}>
                        <TabPanel header="Overview">
                            <div className="row">
                                {this.state.deal ?
                                    <div className="col-md-6 text-center">
                                        <img className="package-image" src={require("../../public/assets/" + this.state.deal.imageUrl.split("/")[2])} alt="destination comes here" />
                                    </div> : null}

                                <div className="col-md-6">
                                    <h4>Package Includes:</h4>
                                    <ul>
                                        {this.state.showItinerary ? this.displayPackageInclusions() :null}
                                    </ul>
                                </div>
                            </div>
                            <div className="text-justify itineraryAbout">
                                <h4>Tour Overview:</h4>
                                {this.state.deal ? this.state.deal.details.about : null}
                            </div>
                        </TabPanel>
                        <TabPanel header="Itinerary">
                            {this.displayPackageHighlights()}
                        </TabPanel>
                        <TabPanel header="Book">
                            <h4 className="itenaryAbout text-success">**Charges per person: {'\u20B9'}{this.state.deal.chargesPerPerson}</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="noOfPersons">Number of Travelers:</label>
                                    <input
                                        type="number"
                                        id="noOfPersons"
                                        className="form-control"
                                        name="noOfPersons"
                                        value={this.state.bookingForm.noOfPersons}
                                        onChange={this.handleChange}
                                    />
                                    {this.state.bookingFormErrorMessage.noOfPersons ?
                                        <span className="text-danger">{this.state.bookingFormErrorMessage.noOfPersons}</span>
                                        : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Trip start Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="form-control"
                                        name="date"
                                        value={this.state.bookingForm.date}
                                        onChange={this.handleChange}
                                    />
                                    {this.state.bookingFormErrorMessage.date ?
                                        <span className="text-danger">{this.state.bookingFormErrorMessage.date}</span>
                                        : null}
                                </div>
                                <div className="form-group">
                                    <label>Include Flights:</label>&nbsp;
                                    <InputSwitch name="flights" id="flights"
                                        checked={this.state.bookingForm.flights}
                                        onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <button id="buttonCalc" className="btn btn-primary" type="submit" disabled={!this.state.bookingFormValid.buttonActive}>Calculate Charges</button>&nbsp;
                                </div>
                            </form>
                            {!this.state.totalCharges ?
                                (this.state.bookingForm.flights ? <React.Fragment><span>**Charges Include flight charges.</span><br/></React.Fragment>
                                     : <React.Fragment><span>**Charges Exclude flight charges.</span><br/></React.Fragment>
                                )
                                :
                                (
                                    <h4 className="text-success">
                                        Your trip ends on {this.state.checkOutDate} and
                                        you will pay ${this.state.totalCharges}
                                    </h4>
                                )
                            }

                            <div className="text-center">
                                <button disabled={!this.state.boookActive} className="btn btn-success" onClick={() => this.openBooking(this.state.deal, this.state.bookingForm, this.state.totalCharges, this.state.checkOutDate, this.state.continent)}>Book</button>
                                &nbsp; &nbsp; &nbsp;
                                <button type="button" className="btn btn-link" onClick={(e) => this.setState({showItinerary:false})}>Cancel</button>
                            </div>
                        </TabPanel>
                    </TabView>
                </Sidebar>
            </div>
        )}
    }
}

let mapStateToProps = (state) => {
    return{
        bookingPackage: state.bookingPackage,
        bookingForm: state.bookingForm,
        totalCharges: state.totalCharges,
        checkOutDate: state.checkOutDate,
        continent: state.continent
    }
}

export default connect(mapStateToProps)(StaticPackage);