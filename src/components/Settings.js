/* eslint-disable no-unused-vars*/
import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { Grid, Divider, List, ListItem, ListItemIcon, ListItemText, Icon, Paper, Typography, Chip, Avatar } from "material-ui";
import { KeyboardArrowRight, InfoOutline, Announcement } from "material-ui-icons";
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

});

class Settings extends Component {

  constructor(props) {
      super(props);

    }

    state = {
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    name: 'hai',
  };


    handleChange = event => {
       this.setState({ [event.target.name]: event.target.value });
     };

  render() {
    const classes = this.props.classes;
    const paper = this.props.paper;


    return (
      //<Grid>Settings</Grid>
      <div className={classes}>
     <Grid container justify="center" style={{marginTop: 70}}  spacing={24}>
       <Grid item xs={12}  >
         <Paper  style={{height: 40}} className={paper}>Notify 15 minutes before reservation

         <Select style={{position: 'absolute', right: 0}}
            value={this.state.answer1}
            onChange={this.handleChange}
            inputProps={{
              name: 'answer1',
              id: 'answer1-simple',
            }}>
            
            <MenuItem value={10}>Yes</MenuItem>
            <MenuItem value={20}>No</MenuItem>
          </Select>
         </Paper>



       </Grid>

       <Grid item xs={12} sm={6}>
         <Paper style={{height: 40}} className={paper}>Play sound for notifications
         <Select style={{position: 'absolute', right: 0}}
            value={this.state.answer2}
            onChange={this.handleChange}
            inputProps={{
              name: 'answer2',
              id: 'answer2-simple',
            }}>
            <MenuItem value={10}>Yes</MenuItem>
            <MenuItem value={20}>No</MenuItem>
          </Select>
         </Paper>
       </Grid>
       <Grid item xs={12} sm={6}>
         <Paper style={{height: 40}} className={paper}>Allow the app to track workout
         <Select style={{position: 'absolute', right: 0}}
            value={this.state.answer3}
            onChange={this.handleChange}
            inputProps={{
              name: 'answer3',
              id: 'answer3-simple',
            }}>
            <MenuItem value={10}>Yes</MenuItem>
            <MenuItem value={20}>No</MenuItem>
          </Select>
         </Paper>
       </Grid>
       <Grid item xs={12} sm={6}>
         <Paper style={{height: 40}} className={paper}>Share location Information
         <Select style={{position: 'absolute', right: 0}}
            value={this.state.answer4}
            onChange={this.handleChange}
            inputProps={{
              name: 'answer4',
              id: 'answer4-simple',
            }}>
            <MenuItem value={10}>Yes</MenuItem>
            <MenuItem value={20}>No</MenuItem>
          </Select>
         </Paper>
       </Grid>

     </Grid>
   </div>
    )
  }
}

export default Settings;
