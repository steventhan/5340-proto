import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Checkbox, Button, Typography, Grid, TextField, FormControlLabel } from 'material-ui';
import GoogleLogin from 'react-google-login';



class Login extends Component {

  handleLogin = () => {
    this.props.onLogin();
  }

  render() {
    const { from } = this.props.location.state || { from : "/"};

    if (this.props.isLoggedIn) {
      return <Redirect to={from} />;
    }
    // console.log(JSON.parse(localStorage.getItem("user")).isSignedIn());

    return (
      <Grid container style={{height: "100vh"}} spacing={0} justify="center" alignItems="center">
        <Grid item xs={9} style={{marginTop: -80}}>
          <form>
            <Typography variant="display3" align="center">
              Marino
            </Typography>
            <TextField
              id="email"
              label="Husky email"
              margin="normal"
              required
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              required
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              variant="raised"
              color="primary"
              fullWidth>
              Log in
            </Button>
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
              color="secondary"
              fullWidth>
              Using Google
            </Button>

            </GoogleLogin>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
