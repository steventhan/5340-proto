import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { IconButton, Popover, Typography, Button, Snackbar } from "material-ui";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import CloseIcon from "material-ui-icons/Close";

import NavigationBar from "./menus/NavigationBar";
import startWorkout from "../start-workout.png";
import FloatingButtonDialog from "./menus/FloatingButtonDialog";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  hamburger: {
    marginRight: -12,
  },
  typography: {
    margin: 10,
  },
  float: {
    position: "fixed",
    bottom: 15,
    right: 15,
    zIndex: 100,
  }
};


class Menus extends Component {
  state = {
    popoverOpen: false,
    floatingButtonDialogOpen : false,
    anchorEl: null,
  }

  handleNotification = (anchor) => {
    this.setState({
      popoverOpen: true,
      anchorEl: findDOMNode(anchor),
    });
  }

  handlePopoverClose = (e) => {
    this.setState({
      popoverOpen: false,
    });
  }

  handleFloatingButton = (e) => {
    this.setState({floatingButtonDialogOpen : true});
  }

  handleFloatingButtonDialogClose = (e) => {
    this.setState({floatingButtonDialogOpen : false});
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <NavigationBar onNotificationClick={this.handleNotification}/>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          anchorReference="anchorEl"
          onClose={this.handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography style={{padding: 10}}>You have some notifications...</Typography>
        </Popover>
        <Button
          style={this.props.snackbarOpen ? {display: "none"} : {}}
          onClick={this.handleFloatingButton}
          variant="fab" color="primary" className={classes.float}>
          <img src={startWorkout} alt="ss" width="65%" />
        </Button>
        <FloatingButtonDialog
          open={this.state.floatingButtonDialogOpen}
          handleDialogClose={this.handleFloatingButtonDialogClose}
        />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.props.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.props.onSnackbarClose}
          message={<span id="message-id">{this.props.snackbarMsg}</span>}
          action={[
            <Button
              key="action"
              component={Link}
              color="secondary"
              size="small"
              to={this.props.snackbarAction.link}
              onClick={this.props.onSnackbarClose}>
              {this.props.snackbarAction.label}
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.props.onSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Menus);
