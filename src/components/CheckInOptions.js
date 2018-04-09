import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, InputLabel, Input, FormHelperText,
  Typography, Button, Divider, CircularProgress, Dialog, DialogContent, DialogActions } from "material-ui";
import { ExpandMore } from "material-ui-icons";
import axios from "axios";


class CheckInDialog extends Component {
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
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onDiscard}
        >
          <DialogContent
            id="alert-dialog-title"
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
          >
            <Typography>
              Check-in code can be found at the reserved machine
            </Typography>
            { this.state.checkingIn ?
            <CircularProgress />
              :
            <FormControl
              fullWidth error={ this.state.error !== "" }
              aria-describedby="name-error-text"
            >
              <InputLabel htmlFor="check-in-code">Code</InputLabel>
              <Input id="check-in-code" value={ this.state.code } onChange={ this.handleCodeChange } />
              <FormHelperText id="check-in-code-error">{ this.state.error }</FormHelperText>
            </FormControl> }
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={this.props.onDiscard} color="default">
              Discard
            </Button>
            <Button
              variant="raised" disabled={ this.state.checkingIn }
              onClick={ this.handleCheckIn } color="primary" autoFocus
            >
              Check in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}


class CheckInOptions extends Component {
  state = {
    expandedPanel: 1,
    codeInput: false,
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

  handleOpenCodeInput = e => {
    this.setState({ codeInput: true });
  }

  handleDiscardCodeInput = e => {
    this.setState({ codeInput: false });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <CheckInDialog
          open={ this.state.codeInput }
          onDiscard={ this.handleDiscardCodeInput }
          onDialogClose={ this.props.onDialogClose }
          sendSnackbarMsg={ this.props.sendSnackbarMsg }
          reservation={ this.props.reservation }
        />
        <ExpansionPanel
          expanded={ this.state.expandedPanel === 0 }
          onChange={ (e, expanded) => this.handleChangePanel(e, expanded, 0) }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant="subheading"><strong>Check-in code</strong></Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails style={{ paddingTop: 24 }}>
            <Button onClick={ this.handleOpenCodeInput } fullWidth variant="raised" color="primary">
              Enter code
            </Button>
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
