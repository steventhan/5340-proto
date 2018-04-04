import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Typography, Grid } from 'material-ui';
import GoogleLogin from 'react-google-login';

import logo from "../husky-logo.png";



class Login extends Component {

  handleLogin = () => {
    this.props.onLogin();
  }

  render() {
    const { from } = this.props.location.state || { from : "/"};

    if (this.props.isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <Grid container style={{height: "100vh"}} spacing={0} justify="center" alignItems="center">
        <Grid item xs={9} style={{ marginTop: -20, display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          <Typography variant="display2" align="center">
            Smart Marino
          </Typography>
          <div>
            <img alt="logo" src={logo} />
          </div>
          <GoogleLogin
            tag="div"
            style={{width: "100%", backgroundColor: "none"}}
            clientId="442551890784-tegu7qqjscdlne0h7jio7eir0a739t46.apps.googleusercontent.com"
            hostedDomain="husky.neu.edu"
            onSuccess={this.props.onGoogleLogin}
            onFailure={this.props.onGoogleLogin}
          >
            <Button
              variant="raised"
              color="primary"
              fullWidth>
              Log in
            </Button>
          </GoogleLogin>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
