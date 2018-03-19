import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText,
  IconButton, Divider, Popover, Paper, Grid, Typography } from "material-ui";
import { HelpOutline } from "material-ui-icons";

import { StatusChip } from "./UtilComponents";


const statusDesc = [
  {name: "Available", desc: "Machine available", color: "#1ab394"},
  {name: "Busy", desc: "Less than 5 people in queue", color: "#f8ac59"},
  {name: "Full", desc: "At least 5 people in queue", color: "#ed5565"},
  {name: "Unavailable", desc: "Machine unavailable", color: "#3f3f3f"},
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
            <List dense>
              {statusDesc.map(st => {
                return (
                  <ListItem key={st.name}>
                    <ListItemAvatar>
                      <Avatar style={{width: 25, height: 25, backgroundColor: st.color}}></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={st.desc}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Popover>
      </div>
    )
  }
}

export default StatusPopover;
