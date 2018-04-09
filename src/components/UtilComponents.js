import React, { Component } from "react";
import { Chip, Grid, Typography } from "material-ui";
import { Slide } from "material-ui/transitions";
import axios from "axios";

const Up = (props) => <Slide direction="up" {...props} />;

const statusColor = {
  Available: "#1ab394",
  Busy: "#f8ac59",
  Full: "#ed5565",
  Unavailable: "#3f3f3f",
}

class StatusChip extends Component  {
  state = {
    status: ""
  }

  componentDidMount = () => {
    this.fetchCurrentReservation();
  }

  componentWillReceiveProps = () => {
    this.fetchCurrentReservation();
  }

  fetchCurrentReservation = () => {
    axios.get(`api/machines/${this.props.machine._id}/reservation`, {
        params: { user: JSON.parse(localStorage.getItem("user")).googleId }
      })
      .then(res => {
        this.setState({ status: "Busy" });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ status: "Available" });
        };
      });
  }

  render() {
    return (
      <div style={{ display: "inline" }}>
        { this.state.status !== "" &&
        <Chip
          label={ this.state.status }
          style={{
            backgroundColor: statusColor[this.state.status],
            color: "#fff",
            height: 20,
            padding: "1px 1px",
          }}
        />
        }
      </div>
    );
  }
}

const MachineDetail = props => (
  <Grid container spacing={ 0 }>
    <Grid item xs={props.left}>
      <Typography component="p">
        <strong>{props.label}</strong>
      </Typography>
    </Grid>
    <Grid item xs={props.right}>
      {typeof props.text === "string" ?
        <Typography component="p">
          {props.text}
        </Typography> : props.text
      }
    </Grid>
  </Grid>
)

export { Up, StatusChip, MachineDetail };
