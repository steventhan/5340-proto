import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import QrReader from "react-qr-reader";
import { Typography } from "material-ui";

import axios from "axios";

import { withStyles } from "material-ui/styles";

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
      this.props.history.push("/my-reservations");
      this.props.sendSnackbarMsg("Reservation started")
    })
    .catch(err => {
      console.log(err);
      this.props.sendSnackbarMsg("QR code not recognized");
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
    return (
      <div style={{ marginTop: 55 }}>
        <QrReader
          delay={ this.state.delay }
          onError={ this.handleError }
          onScan={ this.handleScan }
          style={{ width: '100%' }}
          facingMode="environment"
        />

        <div style={{ padding: 10 }}>
          <Typography>
            Scan qr code at the reserved machine to start your workout
          </Typography>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(QRCodeReader));
