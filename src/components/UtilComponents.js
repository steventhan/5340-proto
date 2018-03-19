import React from "react";
import { Chip } from "material-ui";
import { Slide } from "material-ui/transitions";

const Up = (props) => <Slide direction="up" {...props} />;

const statusColor = {
  Available: "#1ab394",
  Busy: "#f8ac59",
  Full: "#ed5565",
  Unavailable: "#dcdcdc",
}

const StatusChip = (props) => {
  return (
    <Chip
      label={props.status}
      style={{
        backgroundColor: statusColor[props.status],
        color: "#fff",
        height: "100%",
        padding: "1px 1px",
      }} />
  );
}

export { Up, StatusChip };
