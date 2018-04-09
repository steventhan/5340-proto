import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, InputLabel, Input, FormHelperText,
  Typography, Button, Divider, CircularProgress } from "material-ui";
import { ExpandMore } from "material-ui-icons";
import axios from "axios";


class CheckInCodeForm extends Component {
  state = {
    checkingIn: false,
    error: "",
    code: ""
  }

  handleCodeChange = e => {
    this.setState({ code: e.target.value });
  }

  handleCheckIn = e => {
    if (this.state.code === "") {
      this.setState({ error: "This field is required" });
      return;
    }
    this.setState({ checkingIn: true });

    axios.patch(`/api/reservations/${this.props.reservation._id}`, {
      user: JSON.parse(localStorage.getItem("user")).googleId,
      code: this.state.code,
      status: "started"
    })
    .then(res => {
      this.setState({
        checkingIn: true ,
        error: "",
        code: ""
      }, () => {
          this.props.onDialogClose(e)
          this.props.sendSnackbarMsg("Reservation started");
        }
      );
    })
    .catch(err => {
      this.setState({ error: err.response.data, checkingIn: false });
    });
  }

  render() {
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        { this.state.checkingIn ?
        <CircularProgress />
          :
        <FormControl
          fullWidth error={ this.state.error !== "" }
          aria-describedby="name-error-text"
          style={{ marginBottom: 5 }}
        >
          <InputLabel htmlFor="check-in-code">Code</InputLabel>
          <Input id="check-in-code" value={ this.state.code } onChange={ this.handleCodeChange } />
          <FormHelperText id="check-in-code-error">{ this.state.error }</FormHelperText>
        </FormControl> }
        { !this.state.checkingIn &&
        <Button onClick={ this.handleCheckIn } fullWidth variant="raised" color="primary">
          Check in
        </Button> }
      </div>
    );
  }
}

class CheckInOptions extends Component {
  state = {
    expandedPanel: 1,
  };

  handleChangePanel = (e, expanded, panelNum) => {
    let newExpandedPanel;
    if (panelNum === this.state.expandedPanel) {
      newExpandedPanel = 2;
    } else if (this.state.expandedPanel === 0) {
      newExpandedPanel = 1;
    } else if (this.state.expandedPanel === 1) {
      newExpandedPanel = 0;
    } else {
      newExpandedPanel = panelNum;
    }
    this.setState({ expandedPanel: newExpandedPanel });
   };

  render() {
    return (
      <div style={{ width: "100%", marginTop: 10 }}>
        <ExpansionPanel
          expanded={ this.state.expandedPanel === 0 }
          onChange={ (e, expanded) => this.handleChangePanel(e, expanded, 0) }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant="subheading"><strong>Check-in code</strong></Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails style={{ paddingTop: 24 }}>
            <CheckInCodeForm
              onDialogClose={ this.props.onDialogClose }
              sendSnackbarMsg={ this.props.sendSnackbarMsg }
              reservation={ this.props.reservation } />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={ this.state.expandedPanel === 1 }
          onChange={ (e, expanded) => this.handleChangePanel(e, expanded, 1) }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant="subheading"><strong>Scan QR</strong></Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails style={{ paddingTop: 24 }}>
            <Button component={ Link } to="/qr" fullWidth variant="raised" color="primary">
              Open scanner
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default CheckInOptions;
