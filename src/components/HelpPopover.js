import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { IconButton, Popover } from "material-ui";
import { HelpOutline } from "material-ui-icons";


class HelpPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      anchorEl: null
    };
  }

  handleClick = (e) => {
    e.stopPropagation();
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
          anchorOrigin={this.props.anchorOrigin}
          transformOrigin={this.props.transformOrigin}
        >
          <div onClick={(e) => {e.stopPropagation(); this.setState({popoverOpen: false})}}>
            {this.props.children}
          </div>
        </Popover>
      </div>
    )
  }
}

export default HelpPopover;
