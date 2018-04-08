import React, { Component } from 'react';
import { withStyles } from "material-ui/styles";
import { Divider, Button, Typography, Grid, CircularProgress } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import axios from "axios";
import moment from "moment";

import { Up } from "./UtilComponents";
import { machineTypes, capitalize } from "../utils";

class ConfirmDialog extends Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onDiscard}
        >
          <DialogContent id="alert-dialog-title">{this.props.msg}</DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={this.props.onDiscard} color="default">
              No
            </Button>
            <Button variant="raised" onClick={this.props.onConfirm} color={this.props.color} autoFocus>
              Yes, I'm sure!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

class ButtonWithConfirm extends Component {
  state = {
    confirmDialogOpen: false
  }

  handleConfirmDialogDiscard = e => {
    this.setState({ confirmDialogOpen: false });
  }

  handleClick = e => {
    this.setState({ confirmDialogOpen: true });
  }

  handleConfirmed = e => {
    this.setState({ confirmDialogOpen: false }, () => {
      this.props.onClick();
    });
  }


  render() {
    const { msg, onClick, color, ...rest } = this.props;

    return (
      <div>
        <ConfirmDialog
          open={ this.state.confirmDialogOpen }
          onConfirm={ this.handleConfirmed }
          onDiscard={ this.handleConfirmDialogDiscard }
          msg={ msg }
          color= { color }
        />
        <Button
          onClick={ this.handleClick }
          color={ color }
          { ...rest }
        >
        </Button>

      </div>
    );
  }
}


const styles = {
  fullWidth: {
    width: "100%",
    display: "block"
  }
}


class ReservationModifyDialog extends Component {
  state = {
    confirmCancelationDialogOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.reservationId) return;
    axios.get(`/api/reservations/${nextProps.reservationId}`, {
        params: { user: JSON.parse(localStorage.getItem("user")).googleId }
      })
      .then(res => {
        this.setState({ reservation: res.data })
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCancelConfirmation = (e) => {
    this.setState({ confirmCancelationDialogOpen: true });
  }

  handleConfirmDialogDiscard = (e) => {
    this.setState({ confirmCancelationDialogOpen: false });
  }

  handleCancel = (e) => {
    axios.delete(`/api/reservations/${this.state.reservation._id}`, {
    	data: { user: JSON.parse(localStorage.getItem("user")).googleId },
    })
    .then(res => {
      this.setState(
        { confirmCancelationDialogOpen: false, reservation: undefined },
        () => this.props.onDialogClose(e, true)
      );
    })
    .catch(err => {
      this.setState(
        { confirmCancelationDialogOpen: false, reservation: undefined }, () => {
          this.props.onDialogClose(e);
          this.props.sendSnackbarMsg("Something went wrong");
        }
      );
    })
  }

  handleEnd = (e, newStatus) => {
    console.log(newStatus);
    axios.patch(`/api/reservations/${this.state.reservation._id}`, {
      user: JSON.parse(localStorage.getItem("user")).googleId,
      status: newStatus
    })
    .then(res => {
      console.log(res);
      this.setState(
        { reservation: undefined }, () => {
          this.props.onDialogClose(e)
          this.props.sendSnackbarMsg("Reservation ended");
        }
      );
    })
    .catch(err => {
      this.setState(
        { reservation: undefined }, () => {
          this.props.onDialogClose(e);
          this.props.sendSnackbarMsg("Something went wrong");
        }
      );
    })
  }

  handleActionButtonClick = e => {
    if (this.state.reservation.status === "started") {
      this.handleEnd(e, "ended");
    } else {
      this.handleCancel(e);
    }
  }


  render() {
    const { fullScreen } = this.props;
    let action = "";
    if (this.state.reservation) {
      const status = this.state.reservation.status;
      if (status === "started") {
        action = "end";
      } else if (status === "upcoming") {
        action = "cancel";
      }
    }

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
          transition={Up}
        >
          <DialogTitle id="responsive-dialog-title">
            <strong>Reservation detail</strong>
          </DialogTitle>
          {!this.state.reservation &&
          <DialogContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress  size={50} />
          </DialogContent>}
          {this.state.reservation &&
          <DialogContent>
            <Grid container justify="center">
              <Grid item xs={5}>
                <img alt="ss" src={machineTypes[this.state.reservation.machine.type]} style={{width: "100%"}}/>
              </Grid>
              <Grid item xs={7}>
                <Typography component="p">
                  <strong>ID: </strong>{this.state.reservation.machine._id}
                </Typography>
                <Typography component="p">
                  <strong>Type: </strong>{this.state.reservation.machine.type}
                </Typography>
                <Typography component="p">
                  <strong>Status: </strong>{ capitalize(this.state.reservation.status) }
                </Typography>
                <Typography component="p">
                  <strong>Start: </strong>{moment(this.state.reservation.start).format("MM/DD/YYYY - HH:mm")}
                </Typography>
                <Typography component="p">
                  <strong>End: </strong>{moment(this.state.reservation.end).format("MM/DD/YYYY - HH:mm")}
                </Typography>
                <Typography component="p">
                  <strong>Duration: </strong>
                  {moment(this.state.reservation.end).diff(this.state.reservation.start, "minutes")} minutes
                </Typography>
              </Grid>

              <Grid container justify="center">
                <Grid item xs={12}>
                  <Typography variant="subheading"><strong>Description</strong></Typography>
                  <Divider/>
                  <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                    {this.state.reservation.machine.description}
                  </Typography>
                  <Divider/>
                </Grid>
              </Grid>

              <Grid container justify="center" style={{ "marginTop": 10 }}>
                <Grid item xs={12}>
                  <Typography variant="subheading"><strong>How to start</strong></Typography>
                  <Divider/>
                  <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                    Scan the qr code or request a check-in code
                  </Typography>
                  <Divider/>
                </Grid>
              </Grid>

            </Grid>
          </DialogContent>}
          <DialogActions>
            <Button
              onClick={() => this.setState({ reservation: undefined }, this.props.onDialogClose) }
              variant="raised" color="default"
            >
              Discard
            </Button>

            {this.state.reservation &&
              ["upcoming", "started"].includes(this.state.reservation.status) &&
            <ButtonWithConfirm
              msg={ `Are you sure you want to ${action} this reservation?` }
              onClick={ this.handleActionButtonClick }
              variant="raised"
              color={ action === "end" ? "primary" : "secondary" }
            >
              { capitalize(action) } reservation
            </ButtonWithConfirm>}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(ReservationModifyDialog));
