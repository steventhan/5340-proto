import React, { Component } from "react";
import { AppBar, Card, CardContent, Typography,
   Grid, List, Tabs, Tab, Button, MenuItem, Select } from "material-ui";
import axios from "axios";
import moment from "moment";

import ReservationModifyDialog from "./ReservationModifyDialog";
import { machineTypes, capitalize } from "../utils";


class ReservationList extends Component {
  render = () => {
    return (
      <List>
        {this.props.reservations
          .map(r => {
          return (
            <Button
              onClick={(e) => this.props.onMachineClick(e, r._id)}
              key={r._id}
              style={{padding: 3, textAlign: "left", textTransform: "None"}}>
              <Card>
                <CardContent>
                  <Grid container spacing={0} justify="center" alignItems="center">
                    <Grid item xs={4}>
                      <img alt="machine" src={machineTypes[r.machine.type]} style={{width: "90%"}}/>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography component="p">
                        <strong>ID: </strong>{r.machine._id}
                      </Typography>
                      <Typography component="p">
                        <strong>Type: </strong>{r.machine.type}
                      </Typography>
                      <Typography component="p">
                        <strong>Status: </strong>{ capitalize(r.status) }
                      </Typography>
                      <Typography component="p">
                        <strong>Start: </strong>{moment(r.start).format("MM/DD/YYYY - HH:mm")}
                      </Typography>
                      <Typography component="p">
                        <strong>End: </strong>{moment(r.end).format("MM/DD/YYYY HH:mm")}
                      </Typography>
                      <Typography component="p">
                        <strong>Duration: </strong>{moment(r.end).diff(moment(r.start), "minutes")} minutes
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Button>
          );
        })}
      </List>
    );
  }
}


class MyReservations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
      machineTypes: [],
      dialogOpen: false,
      reservations: [],
    };
  }

  componentDidMount() {
    this.fetchReservations();
  }

  fetchReservations = () => {
    axios.get("/api/reservations", {
        params: {user: JSON.parse(localStorage.getItem("user")).googleId}
      })
      .then(res => {
        this.setState({reservations: res.data})
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleReservationModify = (e, id) => {
    this.setState({
      dialogOpen: true,
      reservationId: id
    });
  }

  handleDialogClose = (e, deleted) => {
    this.setState({dialogOpen: false, reservationId: undefined}, () => {
      if (deleted) {
        this.props.sendSnackbarMsg("Cancelled");
      }
    });
    this.fetchReservations();
  }

  handleTabChange = (e, val) => {
    this.setState({ currentTab: val });
  };

  render() {
    return (
      <div>
        <AppBar style={{marginTop: 55}} position="fixed" color="default">
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            fullWidth
          >
            <Tab label="Current" />
            <Tab label="Past" />
          </Tabs>
        </AppBar>
        <Grid container style={{marginTop: 110}} spacing={0} justify="flex-end">
          <Grid item>
            <Select
              value="Most recent"
              displayEmpty
              name="sort"
            >
              {["Most recent", "Oldest"].map((sort, i) => {
                return (
                  <MenuItem key={i} value={sort}>{sort}</MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid xs={12} item>
            {this.state.currentTab === 0 &&
              <ReservationList
                reservations={ this.state.reservations.filter(r => (
                  ["upcoming", "started"].includes(r.status) && moment(r.end) > moment()
                )) }
                onMachineClick={ this.handleReservationModify }
              />}
            {this.state.currentTab === 1 &&
              <ReservationList
                reservations={ this.state.reservations }
                onMachineClick={() => {}}
              />}
          </Grid>
        </Grid>
        <ReservationModifyDialog
          open={this.state.dialogOpen}
          onDialogClose={this.handleDialogClose}
          reservationId={this.state.reservationId}
          sendSnackbarMsg={this.props.sendSnackbarMsg}
        />
      </div>
    )
  }
}

export default MyReservations;
