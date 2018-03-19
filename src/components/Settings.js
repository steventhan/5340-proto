import React, { Component } from "react";
import { Grid, Paper } from "material-ui";
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';


class Settings extends Component {
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
  //  handleChange = (event, index, value) => this.setState({value});

  render() {
    const classes = this.props.classes;
    const paper = this.props.paper;
    return (
      <div className={classes}>
       <Grid container justify="center" style={{marginTop: 70}}  spacing={0}>
         <Grid item xs={12}  >
           <Paper  style={{height: 40}} className={paper}>Notify 15 minutes before reservation
             <Select style={{position: 'absolute', right: 0}}
                value={this.state.answer1}
                displayEmpty
                onChange={this.handleChange}
                inputProps={{
                  name: 'answer1',
                  id: 'answer1-simple',
                }}>
                <MenuItem value="">
                 <em>Yes</em>
                  </MenuItem>

                <MenuItem value={20}>No</MenuItem>
            </Select>
           </Paper>
         </Grid>

         <Grid item xs={12} sm={6}>
           <Paper style={{height: 40}} className={paper}>Play sound for notifications
             <Select style={{position: 'absolute', right: 0}}
                value={this.state.answer2}
                onChange={this.handleChange}
                displayEmpty
                inputProps={{
                  name: 'answer2',
                  id: 'answer2-simple',
                }}>
                <MenuItem value="">
                 <em>Yes</em>
                  </MenuItem>
                <MenuItem value={20}>No</MenuItem>
            </Select>
           </Paper>
         </Grid>

         <Grid item xs={12} sm={6}>
           <Paper style={{height: 40}} className={paper}>Allow the app to collect data
             <Select style={{position: 'absolute', right: 0}}
                value={this.state.answer3}
                onChange={this.handleChange}
                displayEmpty
                inputProps={{
                  name: 'answer3',
                  id: 'answer3-simple',
                }}>
                <MenuItem value="">
                 <em>Yes</em>
                  </MenuItem>
                <MenuItem value={20}>No</MenuItem>
            </Select>
           </Paper>
         </Grid>
         <Grid item xs={12} sm={6}>
           <Paper style={{height: 40}} className={paper}>Share GPS location information
             <Select style={{position: 'absolute', right: 0}}
                value={this.state.answer4}
                onChange={this.handleChange}
                displayEmpty
                inputProps={{
                  name: 'answer4',
                  id: 'answer4-simple',
                }}>
                <MenuItem value="">
                 <em>Yes</em>
                  </MenuItem>
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
