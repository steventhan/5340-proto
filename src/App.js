/* eslint-disable no-unused-vars*/
import React, { Component } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Reboot from "material-ui/Reboot";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";


import NavigationBar from "./components/menus/NavigationBar";
import Dashboard from "./components/Dashboard";
import Reserve from "./components/Reserve";
import MyReservations from "./components/MyReservations";
import Settings from "./components/Settings";
import Membership from "./components/Membership";
import Login from "./components/Login";


import './App.css';

const theme = createMuiTheme();

class App extends Component {
  render() {
    localStorage.setItem("reservations", JSON.stringify([]));
    return (
      // <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Reboot />
            <NavigationBar />
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/reserve" component={Reserve} />
            <Route exact path="/my-reservations" component={MyReservations} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/membership" component={Membership} />

          </div>
        </BrowserRouter>
      // </MuiThemeProvider>
    );
  }
}

export default App;
