import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { IconButton, Divider, Popover, Paper, Grid, Typography } from "material-ui";
import { HelpOutline } from "material-ui-icons";

import { StatusChip } from "./UtilComponents";


const statusDesc = [
  {name: "Available", desc: "Machine available"},
  {name: "Busy", desc: "Less than 5 people in queue"},
  {name: "Full", desc: "At least 5 people in queue"},
  {name: "Unavailable", desc: "Machine unavailable"},
]

class StatusPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      anchorEl: null
    };
  }

  handleClick = (e) => {
    this.setState({
      popoverOpen: true,
      anchorEl: findDOMNode(this.helpIcon),
    });
  }

  render() {
    return (
      <div style={{display: "inline-block"}}>
        <IconButton
          ref={node => {
            this.helpIcon = node;
          }}
          style={{width: 40, height: "inherit"}}
          onClick={this.handleClick}
          size="small">
          <HelpOutline style={{width: "0.9em"}} />
        </IconButton>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          anchorReference="anchorEl"
          onClose={(e) => this.setState({popoverOpen: false})}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Paper style={{padding: "10px 5px 10px 5px"}}>
            <Divider />
            {statusDesc.map(st => {
              return (
                <div key={st.name}>
                  <Grid style={{padding: 5}} container spacing={0}>
                    <Grid xs={5} item>
                      {<StatusChip status={st.name} />}
                    </Grid>
                    <Grid xs={7} item>
                      <Typography>
                        {st.desc}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </div>
              )}
            )}
          </Paper>
        </Popover>
      </div>
    )
  }
}

export default StatusPopover;
