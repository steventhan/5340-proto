import React from "react";
import { Chip, Grid, Typography } from "material-ui";
import { Slide } from "material-ui/transitions";

const Up = (props) => <Slide direction="up" {...props} />;

const statusColor = {
  Available: "#1ab394",
  Busy: "#f8ac59",
  Full: "#ed5565",
  Unavailable: "#3f3f3f",
}

const StatusChip = props => {
  return (
    <Chip
      label={ props.status }
      style={{
        backgroundColor: statusColor[props.status],
        color: "#fff",
        height: 20,
        padding: "1px 1px",
      }} />
  );
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
