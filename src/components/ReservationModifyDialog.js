import React, { Component } from 'react';
import { withStyles } from "material-ui/styles";
import { Divider, InputAdornment, Input, InputLabel,
  Button, Typography, Grid, Radio, TextField, FormControlLabel } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

import { Up } from "./UtilComponents";
import { machineTypes } from "../fakeData"

class ConfirmDialog extends Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleDiscard}
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


const styles = {
  fullWidth: {
    width: "100%",
    display: "block"
  }
}


class ReservationModifyDialog extends Component {
  state = {
    start: "now",
    futureTime: "3:30pm",
    confirmCancelationDialogOpen: false,
    confirmSaveChangesDialogOpen: false
  };

  handleStartChange = (e) => {
    this.setState({start: e.target.value});
  }

  handleSave = (e) => {
    this.setState({confirmCancelationDialogOpen: false, confirmSaveChangesDialogOpen: false});
    this.props.sendSnackbarMsg("Saved");
    this.props.handleDialogClose(e);
  }

  handleCancelConfirmation = (e) => {
    this.setState({confirmCancelationDialogOpen: true});
  }

  handleDiscard = (e) => {
    this.setState({confirmCancelationDialogOpen: false, confirmSaveChangesDialogOpen: false});
  }

  handleCancel = (e) => {
    this.setState({confirmCancelationDialogOpen: false, confirmSaveChangesDialogOpen: false});
    this.props.sendSnackbarMsg("Cancelled");
    let revs = JSON.parse(localStorage.getItem("reservations"));
    localStorage.setItem("reservations", JSON.stringify(revs.filter(r => r.id !== this.props.machine.id)));
    this.props.handleDialogClose(e);
  }


  render() {
    const { fullScreen, classes } = this.props;

    return (
      <div>
        <ConfirmDialog
          open={this.state.confirmCancelationDialogOpen}
          onConfirm={this.handleCancel}
          onDiscard={this.handleDiscard}
          msg={"Are you sure you want to cancel this reservation?"}
          color="secondary"
        />
        <ConfirmDialog
          open={this.state.confirmSaveChangesDialogOpen}
          onConfirm={this.handleSave}
          onDiscard={this.handleDiscard}
          msg={"Are you sure you want to save the changes?"}
          color="primary"
        />
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
          <DialogContent>
            <Grid container justify="center">
              <Grid item xs={4}>
                <img alt="ss" src={machineTypes[this.props.machine.type]} style={{width: "100%"}}/>
              </Grid>
              <Grid item xs={8}>
                <Typography component="p">
                  <strong>ID: </strong>{`${this.props.machine.id}`}
                </Typography>
                <Typography component="p">
                  <strong>Type: </strong>{`${this.props.machine.type}`}
                </Typography>
                <Typography component="p">
                  <strong>Queue size: </strong>{`${this.props.machine.queueSize}`}
                </Typography>
                <Button onClick={this.handleCancelConfirmation} size="small" fullWidth variant="raised" color="secondary">
                  Cancel reservation
                </Button>
              </Grid>

              <Grid container justify="center">
                <Grid item xs={12}>
                  <Typography variant="subheading"><strong>Description</strong></Typography>
                  <Divider/>
                  <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                    {`${this.props.machine.description}`}
                  </Typography>
                  <Divider/>
                </Grid>
              </Grid>

              <Grid style={{marginTop: 12}} container justify="center">
                <Grid item xs={10}>
                  <InputLabel className={classes.fullWidth} htmlFor="">Choose start time:</InputLabel>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.start === "now"}
                        onChange={this.handleStartChange}
                        value="now"
                      />
                    }
                    label="Now"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={this.state.start === "other"}
                        onChange={this.handleStartChange}
                        value="other"
                      />
                    }
                    label="Later at"
                  />
                  <TextField
                    onClick={() => this.setState({start: "other"})}
                    disabled={this.state.start === "other" ? false : true}
                    id="time" type="time" />
                  <InputLabel className={classes.fullWidth} htmlFor="duration">Duration:</InputLabel>
                  <Input
                    style={{maxWidth: 80}}
                    value={20}
                    endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleDialogClose} variant="raised" color="default">
              Discard
            </Button>
            <Button
              onClick={(e) => this.setState({confirmSaveChangesDialogOpen: true})}
              variant="raised"
              color="primary"
              autoFocus>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(ReservationModifyDialog));
