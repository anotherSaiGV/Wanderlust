import React, { Component } from "react";
import axios from "axios";
import {backendUrlUser} from '../BackendURL';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import actionObj from '../Actions/action';

class Register extends Component{

    constructor(props){
        super(props);
        this.state= {
            registerForm: {
                name: "",
                emailId: "",
                contactNo: "",
                password: "",
                userId:0
            },
            registerFormErrorMessage: {
                name: "",
                emailId: "",
                contactNo: "",
                password: ""
            },
             registerFormValid: {
                name: false,
                emailId: false,
                contactNo: false,
                password: false,
                buttonActive: false
             },
             registerResponse: "",
             registerCheck: false,
             registerError: "",
        }
    }

    register = () => {
        axios.post(backendUrlUser+'/register', this.state.registerForm).then((response) => {
            this.setState({registerResponse: response.data, registerCheck: true})                 
        }).catch((err) => { 
            this.setState({registerError: err.response.data.message})
        })

    }

    handleChange= (event) => {
        let {registerForm}= this.state;
        const target= event.target;
        const name= target.name;
        const value= target.value;
        registerForm[name]=value;
        this.setState({registerForm: registerForm});
        this.validateField(name, value)
    }

    handleSubmit= (event) => {
        event.preventDefault();
        this.register();
    }

    validateField = (fieldName, value) => {
        let { registerFormErrorMessage, registerFormValid}= this.state;
        switch(fieldName){
            case "name":
                if(!value|| value===""){
                    registerFormErrorMessage.name= "Please enter your name";
                    registerFormValid.name= false;
                }else{
                    registerFormErrorMessage.name= "";
                    registerFormValid.name= true;
                }
                break;
            case "emailId":
                if(!value|| value===""){
                    registerFormErrorMessage.emailId= "PLease enter your Email Id";
                    registerFormValid.emailId= false;
                }else if(!value.match(/^[A-z][\w\.]+@[a-z]+\.com$/)){
                    registerFormErrorMessage.emailId= "Please enter valid Email Id";
                    registerFormValid.emailId= false;
                }else{
                    registerFormErrorMessage.emailId= "";
                    registerFormValid.emailId= true;
                }
                break;
            case "contactNo":
                if(!value|| value===""){
                    registerFormErrorMessage.contactNo="PLease enter your Contact Number";
                    registerFormValid.contactNo= false;
                }else if(!value.match(/^[1-9]\d{9}$/)){
                    registerFormErrorMessage.contactNo="PLease enter valid Contact Number";
                    registerFormValid.contactNo= false;
                }else{
                    registerFormErrorMessage.contactNo="";
                    registerFormValid.contactNo= true;
                }
                break;
            case "password":
                if(!value|| value===""){
                    registerFormErrorMessage.password= "Please enter your password";
                    registerFormValid.password= false;
                }else{
                    registerFormErrorMessage.password= "";
                    registerFormValid.password= true;
                }
                break;
            default: break;
        }
        registerFormValid.buttonActive= registerFormValid.name && registerFormValid.contactNo && registerFormValid.emailId && registerFormValid.password;
        this.setState({registerFormErrorMessage: registerFormErrorMessage, registerFormValid: registerFormValid});
    }

    render(){        
        if(this.state.registerCheck===true){
            return(
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <br/><br/>
                        <h2><span className="text text-success">{this.state.registerResponse}</span></h2>
                        <h2><span className="text text-primary"><Link to="/login">Click here to Login</Link></span></h2>
                    </div>
                </div>
                <br/><br/>
                </div>
            )
        }else{
        return(
            <div>
                <section id="registerPage" className="registerSection">    {/* *ngIf="!registerPage"  */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4 ">
                                <h1>Join Us</h1>
                                <form className="form" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="uName">Name<span className="text-danger">*</span></label>
                                        <input 
                                            type="text"
                                            value={this.state.registerForm.name}
                                            onChange={this.handleChange}
                                            id="uName"
                                            name="name"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerFormErrorMessage.name ? 
                                    (<span className="text-danger">{this.state.registerFormErrorMessage.name}</span>) : null}

                                    <div className="form-group">
                                        <label htmlFor="uEmail">Email Id<span className="text-danger">*</span></label>
                                        <input 
                                            type="email"
                                            value={this.state.registerForm.emailId}
                                            onChange={this.handleChange}
                                            id="uEmail"
                                            name="emailId"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerFormErrorMessage.emailId ? 
                                    (<span className="text-danger">{this.state.registerFormErrorMessage.emailId}</span>) : null}

                                    <div className="form-group">
                                        <label htmlFor="uContactNo">Contact Number<span className="text-danger">*</span></label>
                                        <input 
                                            type="number"
                                            value={this.state.registerForm.contactNo}
                                            onChange={this.handleChange}
                                            id="uContactNo"
                                            name="contactNo"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerFormErrorMessage.contactNo ? 
                                    (<span className="text-danger">{this.state.registerFormErrorMessage.contactNo}</span>) : null}

                                    <div className="form-group">
                                        <label htmlFor="uPassword">Password<span className="text-danger">*</span></label>
                                        <input 
                                            type="password"
                                            value={this.state.registerForm.password}
                                            onChange={this.handleChange}
                                            id="uPassword"
                                            name="password"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.registerFormErrorMessage.password ? 
                                    (<span className="text-danger">{this.state.registerFormErrorMessage.password}</span>) : null}

                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br/>
                                    {this.state.registerError ? 
                                    (<h6><span className="text-danger">{this.state.registerError}</span></h6>) : null}

                                    <button
                                        type="submit"
                                        disabled={!this.state.registerFormValid.buttonActive}
                                        className="btn btn-primary btn-block"
                                    >
                                        REGISTER
                                    </button>
                                    
                                </form>

                            </div>
                        </div>
                    </div>
                </section>
            <br/><br/>  
            </div>
            
        )
    }}
}



export default Register;