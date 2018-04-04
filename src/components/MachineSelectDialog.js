import React, { Component } from 'react';
import { Divider, InputAdornment, InputLabel, ListItemText,
  ListItemAvatar, List, ListItem, Avatar, Button, Typography, Grid,
  Paper, IconButton, Icon, Select, FormHelperText, FormControl, CircularProgress } from "material-ui";
import Dialog, { DialogActions, DialogContent,
  DialogTitle, withMobileDialog } from 'material-ui/Dialog';
import { withStyles } from "material-ui/styles";
import { DatePicker } from "material-ui-pickers";
import axios from "axios";
import moment from "moment";

import HelpPopover from "./HelpPopover";
import { Up, StatusChip } from "./UtilComponents";
import { machineTypes, evalStatus } from "../fakeData"

const styles = {
  fullWidth: {
    width: "100%",
    display: "block"
  }
};

const statusDesc = [
  {name: "Available", desc: "Machine available", color: "#1ab394"},
  {name: "Busy", desc: "Less than 5 people in queue", color: "#f8ac59"},
  {name: "Full", desc: "Queue is full", color: "#ed5565"},
  {name: "Unavailable", desc: "Machine unavailable", color: "#3f3f3f"},
]

class MachineSelectDialog extends Component {
  state = {
    selectedDate: moment(),
    timeSlots: [],
    start: "",
    end: "",
    startSelected: true,
    endSelected: true,
    machine: undefined
  };

  componentWillReceiveProps(nextProps){
    if (!nextProps.machineId) {
      this.setState({machine: undefined});
      return;
    }

    axios.get(`/api/machines/${nextProps.machineId}`, {
      params: { user: JSON.parse(localStorage.getItem("user")).googleId }
    }).then(res => {
      this.setState({ machine: res.data })
    }).catch(err => {
      console.log(err);
    });
    this.fetchTimeSlots(nextProps.machineId, this.state.selectedDate);

  }

  fetchTimeSlots = (machineId, selectedDate) => {
    axios.get(`/api/machines/${machineId}/${selectedDate.format()}`, {
      params: {user: JSON.parse(localStorage.getItem("user")).googleId}
    }).then(res => {
        let slots = res.data.map(s => {
          s.start = moment(s.start);
          s.end = moment(s.end);
          return s;
        });
        this.setState({ timeSlots: slots });
    }).catch(err => {
      console.log(err);
    });
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date, timeSlots: [] });
    this.fetchTimeSlots(this.props.machineId, date);
  }

  handleStartChange = (e) => {
    this.setState({
      start: e.target.value,
      startSelected: e.target.value !== ""
    });
  }

  handleEndChange = (e) => {
    this.setState({
      end: e.target.value,
      endSelected: e.target.value !== ""
    });
  }

  handleReserve = (e) => {
    if (this.state.start === "" || this.state.end === "") {
      this.setState({
        startSelected: this.state.start !== "",
        endSelected: this.state.end !== ""
      });
      return;
    }
    axios.post("/api/reservations", {
    	"user": JSON.parse(localStorage.getItem("user")).googleId,
      "start": moment(this.state.start).format(),
      "end": moment(this.state.end).format(),
    	"machine": this.props.machineId,
    })
    .then(res => {
      this.setState({
        start: "",
        startSelected: true,
        end: "",
        endSelected: true
      }, () => {
        this.props.handleDialogClose(e);
        this.props.sendSnackbarMsg("Reserved", {label: "View All", link: "/my-reservations"});
      });
    })
    .catch(err => {
      this.setState({
        start: "",
        startSelected: true,
        end: "",
        endSelected: true
      }, () => {
        this.props.handleDialogClose(e);
        this.props.sendSnackbarMsg(err.response.data);
      });
    })
  }

  render() {
    const { fullScreen } = this.props;
    const { selectedDate } = this.state;
    let possibleEndTimes = [];

    for (let s of this.state.timeSlots) {
      if (
        this.state.start !== "" &&
        moment(this.state.start) <= s.start &&
        s.start < moment(this.state.start).add(2, "h")
      ) {
        if (s.reserved) break;
        possibleEndTimes.push(s);
      }
    }

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
        {!this.state.machine &&
        <DialogContent style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress  size={50} />
        </DialogContent>}
        {this.state.machine &&
        <DialogContent>
          <Grid container justify="center">
            <Grid item xs={5}>
              <img alt="ss" src={machineTypes[this.state.machine.type]} style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={7} style={{fontSize: "0.875rem", lineHeight: "1.4em"}}>
              <div>
                <strong>ID: </strong>{this.state.machine._id}
              </div>
              <div >
                <strong>Type: </strong>{this.state.machine.type}
              </div>
              <div>
                <strong>Status: </strong> {<StatusChip status={evalStatus(this.state.machine)} />}
                <HelpPopover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}>
                  <Paper style={{padding: "10px 5px 10px 5px"}}>
                    <List dense>
                      {statusDesc.map(st => {
                        return (
                          <ListItem key={st.name}>
                            <ListItemAvatar>
                              <Avatar style={{width: 25, height: 25, backgroundColor: st.color}}></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={st.desc}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
                </HelpPopover>
              </div>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="subheading"><strong>Description</strong></Typography>
                <Divider/>
                <Typography style={{paddingTop: 10, paddingBottom: 10}} component="p">
                  {this.state.machine.description}
                </Typography>
                <Divider/>
              </Grid>
            </Grid>

            <Grid style={{marginTop: 12}} container justify="center">
              <Grid item xs={8}>
                  <DatePicker
                    label="Date"
                    value={selectedDate}
                    autoOk
                    disablePast
                    maxDate={moment().add(5, "d")}
                    onChange={this.handleDateChange}
                    animateYearScrolling={false}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <Icon>event</Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
              </Grid>
            </Grid>

            <Grid style={{marginTop: 12}} container justify="center">
              <Grid item xs={8}>
                <FormControl style={{width: "100%"}} error={!this.state.startSelected}>
                  <InputLabel>Start</InputLabel>
                  <Select
                    native
                    value={this.state.start}
                    onChange={this.handleStartChange}
                  >
                    <option value="" />
                    {this.state.timeSlots
                      .filter(s => s.start > moment())
                      .map(s => (
                          <option
                            key={s.start.format()}
                            disabled={s.reserved}
                            value={s.start.format()}>{s.start.format("hh:mm a")}
                          </option>
                        )
                      )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl style={{width: "100%"}} error={!this.state.endSelected}>
                  <InputLabel>End</InputLabel>
                  <Select
                    disabled={this.state.start === "" ? true : false}
                    native
                    value={this.state.end}
                    onChange={this.handleEndChange}
                  >
                    <option value="" />
                    {possibleEndTimes.map(s => (
                        <option
                          key={s.end.format()}
                          disabled={s.reserved}
                          value={s.end.format()}>{s.end.format("hh:mm a")}
                        </option>
                      ))
                    }
                  </Select>
                </FormControl>
                {this.state.start === "" &&
                  <FormHelperText>Start time not selected</FormHelperText>}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>}
        <DialogActions>
          <Button
            onClick={() => this.setState({
              start: "",
              startSelected: true,
              end: "",
              endSelected: true
            }, this.props.handleDialogClose)}
            variant="raised" color="default"
          >
            Discard
          </Button>
          <Button
            onClick={this.handleReserve}
            variant="raised" color="primary" autoFocus
            disabled={this.state.machine ? false : true}
          >
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(MachineSelectDialog));
