import React, { Component } from "react";
import { AppBar, Card, CardContent, Typography, IconButton,
   Grid, List, Tabs, Tab, Button, MenuItem, Select } from "material-ui";
import { withStyles } from "material-ui/styles";
import MachineSelectDialog from "./MachineSelectDialog";
import { machines, machineTypes, evalStatus } from "../fakeData";
import floorMap from "../floor.png"
import { KeyboardArrowUp, KeyboardArrowDown } from "material-ui-icons";

const styles = {
  levelButtons: {minWidth: 50, margin: 2}
};

class Reserve extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
      machineTypes: [],
      dialogOpen: false,
      selectedMachine: machines[0]
    };
    Object.keys(machineTypes).forEach((m, i) => {
      this.state.machineTypes[i] = {m: false};
    });
    this.state.machineTypes[machineTypes.length-1] = true;
  }

  handleTabChange = (e, val) => {
    this.setState({ currentTab: val });
  };

  handleMachineSelection = (e, id) => {
    this.setState({
      dialogOpen: true,
      selectedMachine: machines.filter(m => m.id === id)[0]
    });
  }

  handleDialogClose = (e, val) => {
    this.setState({ dialogOpen: false });
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
                {machines.filter(m => {
                  return !JSON.parse(localStorage.getItem("reservations")).reduce((prev, cur) => {
                    return prev || cur.id === m.id;
                  }, false);
                }).map(m => {
                  return (
                    <Button
                      onClick={(e) => this.handleMachineSelection(e, m.id)}
                      key={m.id}
                      style={{padding: 3, textAlign: "left", textTransform: "None"}}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={0}>
                            <Grid item xs={4}>
                              <img src={machineTypes[m.type]} alt="ss" style={{width: "90%"}}/>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography component="p">
                                <strong>ID: </strong>{`${m.id}`}
                              </Typography>
                              <Typography component="p">
                                <strong>Type: </strong>{`${m.type}`}
                              </Typography>
                              <Typography component="p">
                                <strong>Status: </strong>{`${evalStatus(m)}`}
                              </Typography>
                              <Typography component="p">
                                <strong>Description: </strong>{`${m.description}`}
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
          machine={this.state.selectedMachine}
          sendSnackbarMsg={this.props.sendSnackbarMsg}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Reserve);
