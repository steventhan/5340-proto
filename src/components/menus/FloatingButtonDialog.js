import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { GridList, GridListTile, GridListTileBar, Button } from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

import { Up } from "../UtilComponents";

import bikeImg from "../../bike-real.jpg";
import ellipticalImg from "../../elliptical-real.jpg";
import stepmillImg from "../../stepmill-real.jpg";
import treadmillImg from "../../treadmill-real.jpg";
import pullupImg from "../../pullup-real.png";

const machineTypes = [
  {name: "Bike", img: bikeImg},
  {name: "Elliptical", img: ellipticalImg},
  {name: "Pull-up", img: pullupImg},
  {name: "Stepmill", img: stepmillImg},
  {name: "Treadmill", img: treadmillImg},
];


class FloatingButtonDialog extends Component {
  state = {
    open: false,
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        aria-labelledby="responsive-dialog-title"
        transition={Up}
      >
        <DialogTitle id="responsive-dialog-title">
          <strong>Choose machine type</strong>
        </DialogTitle>
        <DialogContent>
          <GridList cellHeight={150}>
            {machineTypes.map((type, i) => (
              <GridListTile
                key={i}
                component={Link}
                to={{
                  pathname: "/reserve",
                  state: { type: type.name }
                }}
                onClick={this.props.handleDialogClose}>
                  <img src={type.img} alt={type.name} />
                  <GridListTileBar
                    title={type.name}
                  />
                  {type.name}
              </GridListTile>
            ))}
          </GridList>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleDialogClose} variant="raised" color="default">
            Discard
          </Button>
          <Button
            component={Link}
            to="/reserve"
            onClick={this.props.handleDialogClose}
            variant="raised"
            color="primary">
            View all
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(FloatingButtonDialog);
