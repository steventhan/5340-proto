/* eslint-disable no-unused-vars*/
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { IconButton, Popover, Typography, Button, Reboot, Snackbar } from "material-ui";
import { MuiThemeProvider, createMuiTheme, withStyles } from "material-ui/styles";

import PrivateRoute from "./components/PrivateRoute";
import Menus from "./components/Menus";
import Dashboard from "./components/Dashboard";
import Reserve from "./components/Reserve";
import MyReservations from "./components/MyReservations";
import Settings from "./components/Settings";
import Membership from "./components/Membership";
import Login from "./components/Login";
import './App.css';

const theme = createMuiTheme();

class App extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      isLoggedIn: user ? true : false,
      snackbarOpen : false,
      snackbarMsg : "",
      snackbarAction : {label: "", link: ""},
    };
  }

  handleSnackbarClose = (e) => {
    this.setState({
      snackbarOpen: false,
    });
  }

  sendSnackbarMsg = (msg, opts) => {
    this.setState({
      snackbarOpen: true,
      snackbarMsg: msg,
      snackbarAction: {
        label: opts && opts.hasOwnProperty("label") ? opts.label : "",
        link: opts && opts.hasOwnProperty("link") ? opts.link : ""
      }
    });
  }

  handleGoogleLogin = (res) => {
    localStorage.setItem("user", JSON.stringify(res))
    this.setState({isLoggedIn: true})
  }

  render() {
    return (
      // <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Reboot />
            {this.state.isLoggedIn &&
            <Menus
              snackbarOpen={this.state.snackbarOpen}
              snackbarMsg={this.state.snackbarMsg}
              snackbarAction={this.state.snackbarAction}
              onSnackbarClose={this.handleSnackbarClose}
              onLogout={this.handleLogout}
            />}

            <Switch>
              <Route
                exact
                path="/login"
                render={props => (
                  <Login
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    onGoogleLogin={this.handleGoogleLogin}
                  />
                )}
              />
              <Route exact path="/logout"
                render={props => {
                  localStorage.removeItem("user");
                  this.setState({isLoggedIn: false})
                  return <Redirect to="/login" />;
                }}
              />

              <PrivateRoute exact path="/" component={Dashboard} isLoggedIn={this.state.isLoggedIn} />
              <PrivateRoute exact path="/reserve" isLoggedIn={this.state.isLoggedIn}
                render={props => <Reserve {...props} sendSnackbarMsg={this.sendSnackbarMsg} />}
              />
              <PrivateRoute exact path="/my-reservations" isLoggedIn={this.state.isLoggedIn}
                render={props => <MyReservations {...props} sendSnackbarMsg={this.sendSnackbarMsg} />}
              />
              <PrivateRoute exact path="/settings" component={Settings} isLoggedIn={this.state.isLoggedIn} />
              <PrivateRoute exact path="/membership" component={Membership} isLoggedIn={this.state.isLoggedIn} />
            </Switch>
          </div>
        </Router>
      // </MuiThemeProvider>
    );
  }
}

export default App;
