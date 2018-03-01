import React, { Component } from 'react';
import {Container, Form, Header } from 'semantic-ui-react';
import { Divider, InputAdornment, Input, InputLabel,
  Button, Typography, Grid, Radio, TextField, FormControlLabel } from 'material-ui';
import axios from 'axios';
import '../Login.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submittedUserName: '',
      submittedPassword: ''};
      isLoggedin: false;
      errorMsg: "";
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit() {
  const { username, password } = this.state;
  //should be doing post to backend
  // somehow this does not get updated in time before it git axios



      window.location.href = '/dashboard';// change the history path, to reroute (hack)
      window.localStorage['isLoggedIn'] = true;

  }


  render() {
    const username = this.state.username;
    const password = this.state.password;
    const submittedUserName = this.state.submittedUserName;
    const submittedPassword = this.state.submittedPassword;

    return (
        <Container>
          <div>{this.state.errorMsg}</div>
          <Form onSubmit={() => this.handleSubmit()}>
            <Header as='h2'>Sign In</Header>
            <Form.Group widths="3">
              <Form.Input fluid required
                          className="username" label="User Name" placeholder='username' name='username'
                          value={this.state.username} onChange={this.handleChange}/>

            </Form.Group>
            <Form.Group widths="3">
              <Form.Input fluid required
                          className="password" label="Password" placeholder='password' type="password" name='password'
                          value={this.state.password} onChange={this.handleChange} />
            </Form.Group>
            <div className="button" height="2" width="2">
            <Form.Button>
            <Button onClick={this.props.handleDialogClose} variant="raised" color="primary">
              Submit
            </Button>
            </Form.Button>
            </div>



          </Form>


        </Container>

    );
  }
}

export default Login;
