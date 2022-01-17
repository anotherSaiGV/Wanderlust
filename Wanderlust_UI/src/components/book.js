import React, { Component } from 'react';
import { InputSwitch } from 'primereact/inputswitch';

import { Accordion, AccordionTab} from 'primereact/accordion';
import {Card} from 'primereact/card';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import backendUrlBooking, { backendUrlUser } from '../BackendURL';
import actObj from '../Actions/action';
import {Fieldset} from 'primereact/fieldset';

// import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';


export class Book extends Component {
    constructor(props) {
        super(props)
    
        this.state = { 
             continent: this.props.continent,
             bookingForm: {
                 noOfPersons: this.props.bookingForm.noOfPersons,
                 date: this.props.bookingForm.date,
                 flights: this.props.bookingForm.flights,
                 deal: this.props.bookingPackage,
                 checkOutDate: this.props.checkOutDate,
                 totalCharges: this.props.totalCharges,
                 contactNo: sessionStorage.getItem('contactNo')
             },
             fieldValidationErrors: {
                 noOfPersons: "",
                 date: ""
             },
             formValid: {
                 noOfPersons: true,
                 date: true,
                 buttonActive: true
             },             
             packagePage: false,
             confirmBooking: false,
             totalCharges: this.props.totalCharges,
             bookingError: "",
             checkCollection: "",
             viewBookings: false,
             panelCollapsed: true
        }
    }

    componentWillMount(){
        this.setState({checkCollection: this.props.location.state.deal})
    }

    displayPackageHighlights = () => {
        let packageHighLightsArray = [];
        let firstElement = (
            <div key={0}>
                <h3>Day Wise itinerary</h3>
                <h5>Day 1</h5>
                {this.state.bookingForm.deal ? <div>{this.state.bookingForm.deal.details.itinerary.dayWiseDetails.firstDay}</div> : null}
            </div>
        );
        packageHighLightsArray.push(firstElement);
        if (this.state.bookingForm.deal) {
            this.state.bookingForm.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((packageHighlight,index)=>{
                    let element=(
                        <div key={index+1}>
                        <h5>Day {this.state.bookingForm.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.indexOf(packageHighlight) + 2}</h5>
                        <div>{packageHighlight}</div>
                    </div>
                    );
                    packageHighLightsArray.push(element)
                });
            let lastElement = (
                <div key={666}>
                    <h5>Day {this.state.bookingForm.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.length + 2}</h5>
                    {this.state.bookingForm.deal.details.itinerary.dayWiseDetails.lastDay}
                    <div className="text-danger">
                        **This itinerary is just a suggestion, itinerary can be modified as per requirement. <a
                            href="#contact-us">Contact us</a> for more details.
                        </div>
                </div>
            );
            packageHighLightsArray.push(lastElement);
            return packageHighLightsArray;
        } else {
            return null;
        }
    }

    validateField = (fieldname, value) => {
        let {fieldValidationErrors, formValid} = this.state
        switch (fieldname) {
            case "noOfPersons":
                if (value === "") {
                    fieldValidationErrors.noOfPersons = "This field can't be empty!";
                    formValid.noOfPersons = false;
                } else if (value < 1 ) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be less than 1!";
                    formValid.noOfPersons = false;
                } else if (value > 5) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be more than 5.";
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
        if(this.state.bookingForm.flights){
            this.setState({totalCharges: this.state.totalCharges+ this.state.bookingForm.deal.flightCharges})
        }else{
            this.setState({totalCharges: this.state.totalCharges- this.state.bookingForm.deal.flightCharges})
        }        
        formValid.buttonActive= formValid.noOfPersons && formValid.date;
        this.setState({fieldValidationErrors: fieldValidationErrors, formValid:formValid})
    }

    handleChange= (event) => {
        const {bookingForm}= this.state;
        const name= event .target.name;
        const value= event.target.value;
        bookingForm[name]=value;
        this.setState({bookingForm: bookingForm}); 
        this.validateField(name, value);
    }
    
    goBack= () => {
        this.setState({packagePage: true})
    }

    confirmBooking= () => {    
          
        axios.post('http://localhost:4000/user/confirmBooking', {bookingForm: this.state.bookingForm, checkCollection: this.state.checkCollection}).then((response) => {
            this.setState({confirmBooking: true});            
        }).catch((err) => {
            this.setState({confirmBooking: true}); 
            this.setState({bookingError: err.response.data.message})
            console.log("ERROR", err.response.data.message);            
        })      
    }

    gotoviewBooking= () => {
        this.setState({viewBookings: true})
    }

    render() {    
        console.log("BOOKING PAGE", this.props)
        if(this.state.viewBookings){
            return(
                <Redirect to={{pathname: '/viewBookings', state: {deal: this.state.checkCollection}}} />
            )
        }               
        if(this.state.confirmBooking){
            if(this.state.bookingError.length>1){
                return(
                    <section id="confirmBooking" className="bookSection">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4">
                                <h2 className="text text-danger">Booking Failed! {this.state.bookingError}</h2><br/>                                
                                <a href={"/packages/"} className="link">Click here to try again</a>
                                
                            </div>
                        </div>
                    </div>
                    </section>
                )
            }else{
            return(
                <section id="confirmBooking" className="bookSection">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 offset-4">
                            <h2>Booking Confirmed</h2><br/>
                            <h2 className="text text-success">Congratulations! Trip planned to {this.state.bookingForm.deal.name} </h2><br/>
                            <h2>Trip starts on: {this.state.bookingForm.date}</h2><br/>
                            <h2>Trip ends on: {this.state.bookingForm.checkOutDate}</h2><br/>
                            <button className="text text-info" onClick={this.gotoviewBooking} style={{border: "0px solid white"}}>
                                Click here to view your Bookings
                            </button>                            
                        </div>
                    </div>
                </div>
                </section>
            )}
        }else 
        if(this.state.packagePage){
            return(
                <Redirect to={'/packages/'+ this.state.continent} />
            )
        }else {
        return (
            <section id="bookPage" className="bookSection">    {/* *ngIf="!registerPage"  */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                        
                        <h2 className="accordion">{this.state.bookingForm.deal.name}</h2>

                        <section id="accordion" className="accordion">
                            <Fieldset legend="Overview" toggleable={true} collapsed={this.state.panelCollapsed}>
                                {this.state.bookingForm.deal.details.about}
                            </Fieldset>
                            <Fieldset legend="Package Inclusions" toggleable={true} collapsed={this.state.panelCollapsed}>
                                <ul>{this.state.bookingForm.deal.details.itinerary.packageInclusions.map((item) => { return (<li>{item}</li>)})}</ul>
                            </Fieldset>
                            <Fieldset legend="Itinerary" toggleable={true} collapsed={this.state.panelCollapsed}>
                                {this.displayPackageHighlights()}
                            </Fieldset>
                        </section>
                        

                        </div>
                        <div className="col-md-6">
                            <Card style={{background: "#C0C0C0"}}>
                                <form>
                                    <br/><br/>
                                    <div className="form-group" style={{"textAlign":"left"}}>
                                        <label htmlFor="noOfPersons" >Number Of Travellers</label><br/>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="noOfPersons"
                                            value={this.state.bookingForm.noOfPersons}
                                            onChange={this.handleChange}
                                        /> 
                                    </div>
                                    <p className="text text-danger">{this.state.fieldValidationErrors.noOfPersons}</p>

                                    <div className="form-group" style={{"textAlign":"left"}}>
                                        <label htmlFor="">Trip Start Date</label><br/>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={this.state.bookingForm.date}
                                            onChange={this.handleChange}
                                        /> 
                                    </div>
                                    <p className="text text-danger">{this.state.fieldValidationErrors.date}</p>

                                    <div className="form-group" style={{"textAlign":"left"}}>
                                        <label>Include Include Flights:</label>&nbsp;
                                        <InputSwitch name="flights" id="flights"
                                            checked={this.state.bookingForm.flights}
                                            value={this.state.bookingForm.flights}
                                            onChange={this.handleChange} 
                                        />
                                    </div>
                                    <div className="form-group" style={{"textAlign":"left"}}>
                                        <p>Your trip ends on: {this.state.bookingForm.checkOutDate}</p>
                                        <h2>You Pay: ${this.state.totalCharges}</h2>
                                    </div>
                                    <br/>
                                    <button type="button" className="btn btn-success btn-lg" disabled={!this.state.formValid.buttonActive} onClick={this.confirmBooking} >CONFIRM BOOKING</button> {" "}
                                    <button type="button" className="btn btn-success btn-lg" onClick={this.goBack}>GO BACK</button>                                    
                                </form>
                            </Card>                                
                        </div>
                    </div>
                </div>
            </section>
        )
        }
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

export default connect(mapStateToProps)(Book)
