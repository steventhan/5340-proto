/* eslint-disable no-unused-vars*/
import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { IconButton, Popover, Typography, Button, Reboot, Snackbar } from "material-ui";
import CloseIcon from "material-ui-icons/Close";
import { MuiThemeProvider, createMuiTheme, withStyles } from "material-ui/styles";


import NavigationBar from "./components/menus/NavigationBar";
import Dashboard from "./components/Dashboard";
import Reserve from "./components/Reserve";
import MyReservations from "./components/MyReservations";
import Settings from "./components/Settings";
import Membership from "./components/Membership";
import Login from "./components/Login";
import FloatingButtonDialog from "./components/menus/FloatingButtonDialog";
import startWorkout from "./start-workout.png";
import './App.css';

const theme = createMuiTheme();

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  hamburger: {
    marginRight: -12,
  },
  typography: {
    margin: 10,
  },
  float: {
    position: "fixed",
    bottom: 15,
    right: 15,
    zIndex: 100,
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      snackbarOpen : false,
      snackbarMsg : "",
      snackbarAction : {label: "", link: ""},
      floatingButtonDialogOpen : false,
      popoverOpen: false,
      anchorEl: null,
    };
  }

  handleNotification = (anchor) => {
    this.setState({
      popoverOpen: true,
      anchorEl: findDOMNode(anchor),
    });
  }

  handlePopoverClose = (e) => {
    this.setState({
      popoverOpen: false,
    });
  }

  handleFloatingButton = (e) => {
    this.setState({floatingButtonDialogOpen : true});
  }

  handleFloatingButtonDialogClose = (e) => {
    this.setState({floatingButtonDialogOpen : false});
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

  handleLogin = () => {
    this.setState({isLoggedIn: true})
  }

  handleLogout = () => {
    this.setState({isLoggedIn: false})
  }

  render() {
    const classes = this.props.classes;
    return (
      // <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
          <Reboot />
          <Switch>
            <Route exact path="/" render={() => <Login onLogout={this.handleLogout} onLogin={this.handleLogin} />} />
            {this.state.isLoggedIn &&
            <div>
              <NavigationBar onLogout={this.handLogout} onNotificationClick={this.handleNotification}/>
              <Popover
                open={this.state.popoverOpen}
                anchorEl={this.state.anchorEl}
                anchorReference="anchorEl"
                onClose={this.handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography style={{padding: 10}}>You have some notifications...</Typography>
              </Popover>
              <Button
                style={this.state.snackbarOpen ? {display: "none"} : {}}
                onClick={this.handleFloatingButton}
                variant="fab" color="primary" className={classes.float}>
                <img src={startWorkout} alt="ss" width="65%" />
              </Button>
              <FloatingButtonDialog
                open={this.state.floatingButtonDialogOpen}
                handleDialogClose={this.handleFloatingButtonDialogClose}
              />
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={this.state.snackbarOpen}
                autoHideDuration={5000}
                onClose={this.handleSnackbarClose}
                message={<span id="message-id">{this.state.snackbarMsg}</span>}
                action={[
                  <Button
                    key="action"
                    component={Link}
                    color="secondary"
                    size="small"
                    to={this.state.snackbarAction.link}
                    onClick={this.handleClose}>
                    {this.state.snackbarAction.label}
                  </Button>,
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleSnackbarClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/reserve" render={() => <Reserve sendSnackbarMsg={this.sendSnackbarMsg}/>} />
              <Route exact path="/my-reservations" render={() => <MyReservations sendSnackbarMsg={this.sendSnackbarMsg}/>} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/membership" component={Membership} />
            </div>}
            <Route render={() => <Login onLogout={this.handleLogout} onLogin={this.handleLogin} />} />
          </Switch>
        </div>
        </BrowserRouter>
      // </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
