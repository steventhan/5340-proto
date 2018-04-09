import React, { Component } from "react";
import { AppBar, Card, CardContent, Typography, Checkbox, ListItemText,
   Grid, List, Tabs, Tab, Button, MenuItem, Select } from "material-ui";
import { withStyles } from "material-ui/styles";
import { KeyboardArrowUp, KeyboardArrowDown } from "material-ui-icons";
import axios from "axios";

import MachineSelectDialog from "./MachineSelectDialog";
import { StatusChip, MachineDetail } from "./UtilComponents";
import { machineTypes, evalStatus } from "../utils";
import floorMap from "../floor.png"

const styles = {
  levelButtons: {minWidth: 45, margin: 2}
};


const types = [
  "Bike",
  "Elliptical",
  "Pull-up",
  "Stepmill",
  "Treadmill",
];


class Reserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
      machines: [],
      machineTypes: props.location.state && props.location.state.type ? [props.location.state.type] : types,
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

  handleTypeChange = e => {
    this.setState({ machineTypes: e.target.value });
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
              multiple
              renderValue={selected => {
                if (selected.length === 1) {
                  return selected[0];
                }
                return selected.length === types.length ? "All" : "Multiple";
              }}
              value={ this.state.machineTypes }
              onChange={ this.handleTypeChange }
              name="types"
            >
              {types.map((type, i) => {
                return (
                  <MenuItem key={i} value={ type }>
                    <Checkbox checked={ this.state.machineTypes.indexOf(type) > -1 } />
                    <ListItemText primary={ type } />
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={0} justify="center">
          <Grid xs={12} sm={7} md={5} item>
            {this.state.currentTab === 0 &&
              <List>
                {this.state.machines
                  .filter(m => {
                    return ["Available", "Busy"].includes(evalStatus(m))
                            && this.state.machineTypes.includes(m.type);
                  }).map(m => {
                  return (
                    <Button
                      fullWidth
                      onClick={(e) => this.handleMachineSelection(e, m._id)}
                      key={m._id}
                      style={{padding: 3, textAlign: "left", textTransform: "None"}}>
                      <Card style={{ width: "100%" }}>
                        <CardContent>
                          <Grid container spacing={8} justify="center" alignItems="center">
                            <Grid item xs={4}>
                              <img src={machineTypes[m.type]} alt="ss" style={{width: "90%"}}/>
                            </Grid>
                            <Grid item xs={8}>
                              <MachineDetail left={ 3 } right={ 9 } label="ID:" text={ m._id } />
                              <MachineDetail left={ 3 } right={ 9 } label="Type:" text={ m.type } />
                              <MachineDetail left={ 3 } right={ 9 } label="Status:" text={ <StatusChip status={evalStatus(m)} /> } />
                              <Typography>
                                <strong>Description: </strong>{m.description}
                              </Typography>
                              {/* <Typography component="p">
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
                              </Typography> */}
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
