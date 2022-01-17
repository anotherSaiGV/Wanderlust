import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios';
import { backendUrlBooking } from '../BackendURL';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';

export class viewBookings extends Component {

    constructor(props){
        super(props);
        this.state={
            details: {
                contactNo: sessionStorage.getItem("contactNo")
            },
            data: [],
            status:0,
            dialog_visible: false,
            response_text: "",
            startBooking: false
        }
    }
    
    startBooking= () => {
        this.setState({startBooking: true})
    }

    componentDidMount(){                      
        axios.post(backendUrlBooking+"/viewBooking", this.state.details).then((response) => {
            this.setState({data: response.data, status: 1})     
        }).catch((err) => {
            console.log("ERROR", err);            
        })
    }

    cancelBooking= (bookingId, userId, index, destinationId) => {
        let name={ bookingId: bookingId, userId: userId, destinationId: destinationId}
        axios.post(backendUrlBooking+"/cancelBooking", name).then((response) => {
            console.log("CANCEL RESPONSE", response);            
            this.setState({response_text: response.statusText, dialog_visible: false})        
            this.deleteData(index);    
        }).catch((err) => {
            console.log("CANCEL_ERROR", err);            
        })
        
    }
    confirmCancel= () => {
        this.setState({dialog_visible: true})
    }

    onHide= () =>{
        this.setState({dialog_visible: false})
    }

    deleteData= (index) => {
        let dataDup= [...this.state.data]
        dataDup.splice(index,1);
        this.setState({data: dataDup})        
    }

    // 
    render() {          
        if(this.state.startBooking){
            return <Redirect to={'/packages'} />
        }          
        if(this.state.status===1){
            if(this.state.data.length>0){
                return (
                    this.state.data.map((item, index) => {
                        return(                            
                        <section id="viewBooking" className="viewBookings">
                        <div className="container-fluid">
                            <div className="row" style={{textAlign: "left"}}>
                                <div className="col-md-6 offset-3">
                                <p style={{paddingLeft: "10px"}}>BOOKING ID:{item.bookingId}</p>
                                <Card title={item.destinationName}>
                                    <div className="container-fluid"> 
                                        <div className="row">
                                        <div className="col-md-4">
                                            <p>Trip Starts on:{new Date(item.checkInDate).toDateString().toString()}</p>
                                            <p>Trips ends on:{new Date(item.checkOutDate).toDateString().toString()}</p>
                                            <p>Travellers:{item.noOfPersons}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p>Fare Details</p>
                                            <p>${item.totalCharges}</p>  
                                            <button className="text text-info" onClick={this.confirmCancel} style={{border: "0px solid white"}}>Claim Refund</button>
                                        </div>
                                        <div className="content-section implementation">
                                            <Dialog
                                                header="Confirmation"
                                                visible={this.state.dialog_visible}
                                                style={{ width: '50vw' }}
                                                footer={<div>
                                                    <Button label="BACK" icon="pi pi-check" onClick={this.onHide} />
                                                    <Button label="CONFIRM CANCELLATION" icon="pi pi-times" onClick={() => {this.cancelBooking(item.bookingId, item.userId, index, item.destId)}} className="p-button-secondary" />
                                                  </div>}
                                                onHide={this.onHide}
                                                maximizable
                                            >
                                                <p className="text text-danger">Are you sure you want to cancel your trip to {item.destinationName}</p>
                                            </Dialog>
                                        </div>
                                        </div>
                                    </div>                                
                                </Card>
                                </div>
                            </div>
                        </div>
                        </section>
                        )
                    })
                    
                )
            }else{
                return(
                    <section id="viewBooking" className="viewBookings">
                        <div className="container-fluid">
                            <div className="row" style={{textAlign: "left"}}>
                                <div className="col-md-8 offset-2">
                                <h2>Sorry! You have not planned any trips with us yet</h2><br/>
                                <button className="btn btn-lg btn-success" style={{paddingLeft: "50px"}} onClick={this.startBooking}>Click here to start booking</button>
                                </div>
                            </div>
                        </div>
                        </section>
                )
            }
        }          
        else if(!this.state.details.contactNo){
            alert("Please login to see planned trips")
            return <Redirect to={'/login'} />
        }  
        else if(this.state.status===0){
            return(
                <ProgressSpinner />
            )
        }
    }
}

export default viewBookings
