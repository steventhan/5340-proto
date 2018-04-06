import React, { Component } from "react";
import QrReader from "react-qr-reader";
import { Button } from "material-ui";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

import axios from "axios";

import { withStyles } from "material-ui/styles";
import { Up } from "./UtilComponents";

const styles = {
  fullWidth: {
    width: "100%",
    display: "block"
  }
};

class QRCodeReader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: "",
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data === this.state.data) return;

    axios.post("/api/qr", {
      "user": JSON.parse(localStorage.getItem("user")).googleId,
      "machine": this.state.data,
    })
    .then(res => {
      this.props.onReaderClose();
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleScan = (data) => {
    if (data && data.includes("marino-")) {
      this.setState({ data: data.split("-")[1] });
    }
  }

  handleError = (err) => {
    console.error(err);
  }

  render() {
    const { fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.onReaderClose}
        aria-labelledby="responsive-dialog-title"
        transition={Up}
      >
        <DialogTitle id="responsive-dialog-title">
            <strong>Scan QR code</strong>
        </DialogTitle>
        <DialogContent>
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
            facingMode="environment"
          />
          <p>{this.state.result}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onReaderClose} variant="raised" color="default">
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(QRCodeReader));
