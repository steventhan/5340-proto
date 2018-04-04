import React, { Component } from "react";
import { AppBar, Card, CardContent, Typography,
   Grid, List, Tabs, Tab, Button, MenuItem, Select } from "material-ui";
import { withStyles } from "material-ui/styles";
import { KeyboardArrowUp, KeyboardArrowDown } from "material-ui-icons";
import axios from "axios";

import MachineSelectDialog from "./MachineSelectDialog";
import { StatusChip } from "./UtilComponents";
import { machineTypes, evalStatus } from "../fakeData";
import floorMap from "../floor.png"

const styles = {
  levelButtons: {minWidth: 45, margin: 2}
};


class Reserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
      machines: [],
      machineTypes: [],
      dialogOpen: false,
    };
  }

  componentDidMount() {
    this.fetchMachines();
  }

  fetchMachines() {
    axios.get("/api/machines", {
        params: { user: JSON.parse(localStorage.getItem("user")).googleId }
      })
      .then(res => {
        this.setState({ machines: res.data })
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleTabChange = (e, val) => {
    this.setState({ currentTab: val });
  };

  handleMachineSelection = (e, id) => {
    this.setState({
      dialogOpen: true,
      machineId: id,
    });
  }

  handleDialogClose = (e, val) => {
    this.fetchMachines();
    this.setState({ dialogOpen: false, machineId: undefined });
  }

  render() {
    const classes = this.props.classes
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
            <Tab label="List View" />
            <Tab label="Floor View" />
          </Tabs>
        </AppBar>
        <Grid container style={{marginTop: 110}} spacing={0} justify="space-between">
          <Grid item style={{paddingLeft: 10}}>
            {this.state.currentTab === 1 &&
              <div>
                <span style={{marginRight: 10}}>Level 1</span>
                <Button color="primary" variant="raised" size="small" className={classes.levelButtons}>
                  <KeyboardArrowUp />
                </Button>
                <Button color="primary" variant="raised" size="small" className={classes.levelButtons}>
                  <KeyboardArrowDown />
                </Button>
              </div>}
          </Grid>
          <Grid item style={{paddingRight: 10}}>
            <Select
              value="All"
              displayEmpty
              name="Types"
            >
              {Object.keys(machineTypes).map((type, i) => {
                return (
                  <MenuItem key={i} value={type}>{type}</MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={0} justify="flex-end">
          <Grid xs={12} item>
            {this.state.currentTab === 0 &&
              <List>
                {this.state.machines.filter(m => {
                  return ["Available", "Busy"].includes(evalStatus(m))
                      && !JSON.parse(localStorage.getItem("reservations")).reduce((prev, cur) => {
                    return prev || cur._id === m._id;
                  }, false);
                }).map(m => {
                  return (
                    <Button
                      onClick={(e) => this.handleMachineSelection(e, m._id)}
                      key={m._id}
                      style={{padding: 3, textAlign: "left", textTransform: "None"}}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={0}>
                            <Grid item xs={4}>
                              <img src={machineTypes[m.type]} alt="ss" style={{width: "90%"}}/>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography component="p">
                                <strong>ID: </strong>{m._id}
                              </Typography>
                              <Typography component="p">
                                <strong>Type: </strong>{m.type}
                              </Typography>
                              <div>
                                <strong>Status: </strong><StatusChip status={evalStatus(m)} />
                              </div>
                              <Typography>
                                <strong>Description: </strong>{m.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Button>
                  );
                })}
              </List>}
            {this.state.currentTab === 1 &&
              <div style={{paddingTop: 3}}>
                <img onClick={() => this.setState({dialogOpen: true})} alt="ss" src={floorMap} width="100%"/>
              </div>}
          </Grid>
        </Grid>
        <MachineSelectDialog
          open={this.state.dialogOpen}
          handleDialogClose={this.handleDialogClose}
          machineId={this.state.machineId}
          sendSnackbarMsg={this.props.sendSnackbarMsg}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Reserve);
