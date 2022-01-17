import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import StaticPackage from './staticPackages';

//import {backendUrlUser,backendUrlPackage,backendUrlBooking} from '../BackendURL';

class Home extends Component {
    state = {
        continent: "",
        packagePage: false,
        subMessage: "",
        homePage: "",
        emailId: "",
        searchEnable: true
    };

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value })
        this.validateField(name, value);
    }

    validateField= (name, value)=>{
        switch(name){
            case "continent":   
                value.length==0 ? this.setState({searchEnable: true}): this.setState({searchEnable: false})   
                break;                
        }
    }

    validateEmail= ()=>{
        if (this.state.emailId) {
            if (this.state.emailId.match(/^[A-z][\w\.]+@[a-z]+\.com$/)) {
                this.setState({ subMessage: "Thank you for subscribing. Updates will be sent to the subscribing Email ID" });
                setTimeout(()=>{
                    this.setState({subMessage: ""})
                }, 3000)
            }else{
                this.setState({ subMessage: "Please enter Valid Email ID" });
            }
        }
        else
            this.setState({ subMessage: "Please enter Valid Email ID" });
    }

    handleClick = (event) => {
        event.preventDefault();
        this.validateEmail();
        this.setState({emailId: ""});
    }

    getPackages = () => {
        sessionStorage.setItem('continent', this.state.continent);
        this.setState({ packagePage: true });
    }

    render() {
        if (this.state.packagePage === true) return <Redirect to={'/packages/' + this.state.continent} />
        return (
            <div>
                <header className="masthead book-page" id="page-top">
                    <div className="container d-flex h-100 align-items-center">
                        <div className="mx-auto text-center">
                            <h1 className="mx-auto my-0 text-uppercase">Wanderlust</h1>
                            <h2 className="text-white-50 mx-auto mt-2 mb-5">All that is gold does not glitter,
                                Not all those who wander are lost.</h2>
                            <div className="form-inline d-flex">
                                <input
                                    type="text"
                                    className="form-control-lg flex-fill"
                                    name="continent"
                                    value={this.state.continent}
                                    onChange={this.handleChange}
                                    id="continent"
                                    placeholder="Where?"
                                />&nbsp;
                                <button className="btn btn-primary mx-auto" onClick={this.getPackages} disabled={this.state.searchEnable}>Search</button>

                            </div>
                        </div>
                    </div>
                </header>

                <section id="about" className="about-section text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <h2 className="text-white mb-4">Unleash the traveller inside you</h2>
                                <p className="about-paragraph text-center">When someone makes a travel plan, the first few things they want to sort out, are flights, accommodation, and other amenities for a convenient holiday.
                                    To enjoy holidays, you want to have the basics taken care of, especially for family vacations and honeymoon trips.
                                    You want your accommodation, return flight bookings, meals of the days, and other traveling formalities sorted beforehand.
                                    At <Link to="/">Wanderlust</Link>, we take care of all the requirements to ensure that you get to enjoy the best of your holiday, exploring and experiencing the destination.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="hotDeals" className="hotDeals-section">
                    <StaticPackage />
                </section>

                <section id="signup" className="signup-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-lg-8 mx-auto text-center">
                                <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
                                <form className="form-inline d-flex">
                                    <input
                                        type="email"
                                        className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                                        id="inputEmail"
                                        name="emailId"
                                        value={this.state.emailId}
                                        onChange={this.handleChange}
                                        placeholder="Enter email address..."
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary mx-auto"
                                        onClick={this.handleClick}
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                        <br />
                        {this.state.subMessage ?
                            <span className="text-danger text-center">{this.state.subMessage}</span> :
                            null}
                    </div>
                </section>


                <section className="contact-section bg-black">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 mb-3 mb-md-0">
                                <div className="card py-4 h-100">
                                    <div className="card-body text-center">
                                        <h4 className="text-uppercase m-0">Address</h4>
                                        <hr className="my-4" />
                                        <div className="small text-black-50">Hyderabad, Telangana</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-3 mb-md-0">
                                <div className="card py-4 h-100">
                                    <div className="card-body text-center">
                                        <h4 className="text-uppercase m-0">Email</h4>
                                        <hr className="my-4" />
                                        <div className="small text-black-50"><Link to="/">saigv.cet98@gmail.com</Link></div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 mb-3 mb-md-0">
                                <div className="card py-4 h-100">
                                    <div className="card-body text-center">
                                        <h4 className="text-uppercase m-0">Phone</h4>
                                        <hr className="my-4" />
                                        <div className="small text-black-50">+91 9531925878</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}

export default Home;