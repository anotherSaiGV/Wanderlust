import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './App.css';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import Login from './components/login';
import Home from './components/home';
import Book from './components/book';
import StaticPackage from './components/staticPackages';
import Register from './components/register';
import Packages from './components/packages';
import viewBookings from './components/viewBookings';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      logged_userId: sessionStorage.getItem('userId'),
      logged_userName: sessionStorage.getItem('userName'),
      dialog_visible: false,
      logged_out: false
    }
  }

  onClick = (event) => {
    this.setState({ dialog_visible: true })
  }

  onHide = (event) => {
    this.setState({ dialog_visible: false });
  }

  logout = () => {
    this.setState({ dialog_visible: false });
    sessionStorage.clear();
    this.setState({ logged_out: true });
    window.location.reload();
  }

  confirm_logout = () => {
    this.setState({ dialog_visible: true });
  }

  render() {

    const footer = (
      <div>
        <Button label="CONTINUE EXPLORING" icon="pi pi-check" onClick={this.onHide} />
        <Button label="LOGOUT" icon="pi pi-times" onClick={this.logout} className="p-button-secondary" />
      </div>
    );

    return (
      <div>
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">Start Wandering</Link>
              </div>
              <ul className="navbar-nav ml-auto">
                {this.state.logged_userId ? <li className="nav-item">
                  <Link className="nav-link" to="">Welcome {this.state.logged_userName}</Link>
                </li> : null}
                <li className="nav-item">
                  <Link className="nav-link" to="/packages/hotdeals">Hot Deals </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewBookings">Planned Trips</Link>
                </li>
                {!this.state.logged_userId ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"> Login</Link>
                  </li> : null}
                {this.state.logged_userId ?
                  <li className="nav-item">
                    <button className="nav-link btn btn-secondary" onClick={this.confirm_logout}>Logout</button>
                  </li> : null}
              </ul>
            </nav>
            {this.state.logged_out ? <Redirect to="/" /> : null}
            <div className="content-section implementation">
              <Dialog
                header="Confirmation"
                visible={this.state.dialog_visible}
                style={{ width: '50vw' }}
                footer={footer}
                onHide={this.onHide}
                maximizable
              >
                Are you sure you want to logout?
            </Dialog>
            </div>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home/:userId" component={Home}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/packages" component={StaticPackage}></Route>{/* Only HotDeals*/}
              <Route exact path="/packages/:continent" component={Packages}></Route>{/* Destinations with search*/}
              <Route exact path="/book/:dealId" component={Book}></Route>
              <Route exact path="/viewBookings" component={viewBookings}></Route>
              {/* <Route path="*" render={() => <Redirect to="/login" />}></Route> */}
            </Switch>
          </div>
        </Router>
        <footer className="bg-black text-center text-white-50">
          Copyright &copy; www.eta.wanderlust.com 2018
        </footer>
      </div>
    );
  }
}

export default App;
