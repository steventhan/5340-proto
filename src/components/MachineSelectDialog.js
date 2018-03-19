import React, { Component } from 'react';
import { Divider, InputAdornment, Input, InputLabel,
  Button, Typography, Grid, Radio, TextField, FormControlLabel } from "material-ui";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

import { withStyles } from "material-ui/styles";

import StatusPopover from "./StatusPopover";
import { Up, StatusChip } from "./UtilComponents";
import { machineTypes, evalStatus } from "../fakeData"

const styles = {
  fullWidth: {
    width: "100%",
    display: "block"
  }
}

class MachineSelectDialog extends Component {
  state = {
    open: false,
    start: "now",
    futureTime: "3:30pm"
  };

  handleStartChange = (e) => {
    this.setState({start: e.target.value});
  }

  render() {
    const { fullScreen, classes } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        transition={Up}
      >
        <DialogTitle id="responsive-dialog-title">
            <strong>Machine information</strong>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center">
            <Grid item xs={5}>
              <img alt="ss" src={machineTypes[this.props.machine.type]} style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={7} style={{fontSize: "0.875rem", lineHeight: "1.4em"}}>
              <div>
                <strong>ID: </strong>{this.props.machine.id}
              </div>
              <div >
                <strong>Type: </strong>{this.props.machine.type}
              </div>
              <div>
                <strong>Status: </strong> {<StatusChip status={evalStatus(this.props.machine)} />}
                <StatusPopover />
              </div>
              <div>
                <strong>Queue size: </strong>{this.props.machine.queueSize}
              </div>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="subheading"><strong>Description</strong></Typography>
                <Divider/>
                <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                  {this.props.machine.description}
                </Typography>
                <Divider/>
              </Grid>
            </Grid>

            <Grid style={{marginTop: 12}} container justify="center">
              <Grid item xs={10}>
                <form>
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

                </form>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} variant="raised" color="default">
            Discard
          </Button>
          <Button onClick={(e) => {
            let revs = JSON.parse(localStorage.getItem("reservations"));
            revs.push(this.props.machine);
            localStorage.setItem("reservations", JSON.stringify(revs));
            this.props.handleDialogClose(e);
            this.props.sendSnackbarMsg("Reserved", {label: "View", link: "/my-reservations"});
          }} variant="raised" color="primary" autoFocus>
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(MachineSelectDialog));
