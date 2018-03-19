import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { Grid, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "material-ui";
import { InfoOutline, Announcement } from "material-ui-icons";

const statuses = [
  "Machines in use: 62/100",
  "Number of people: 111/200",
];

const styles = {
  bullet: {
    display: 'inline-block',
    margin: '0 0px',
  }
}

class Dashboard extends Component {
  render() {
    const classes = this.props.classes;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <Grid container justify="center" style={{marginTop: 70}}  spacing={0}>
        <Grid item xs={12} sm={7}>
          <Paper style={{margin: 10, padding: 10}} elevation={4}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <InfoOutline />
                </ListItemIcon>
                <Typography color="inherit" variant="title">
                  <strong><ListItemText disableTypography primary="Your gym status" /></strong>
                </Typography>
              </ListItem>
              <Divider />
              {statuses.map((s, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemIcon>
                      {bull}
                    </ListItemIcon>
                    <ListItemText primary={s} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={7}>
          <Paper style={{margin: 10, padding: 10}} elevation={4}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Announcement />
                </ListItemIcon>
                <Typography color="inherit" variant="title">
                  <strong><ListItemText disableTypography primary="Announcement" /></strong>
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="body2" paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla feugiat lectus eget pretium.
                  Vestibulum felis lorem, ultrices non justo vitae, dictum venenatis tortor. Nunc rhoncus neque nec
                  purus convallis, sed suscipit nulla eleifend. Nunc condimentum non magna eget placerat. Nunc ornare
                  convallis justo, sed placerat mauris efficitur vel. Donec ullamcorper ornare risus ac semper. Sed
                  congue sodales justo, ac tincidunt dui vehicula vel. Vivamus egestas accumsan massa sit amet
                  vestibulum. Morbi euismod nunc enim, at elementum nulla scelerisque ac. Vivamus velit lorem,
                  scelerisque et orci ac, accumsan viverra libero. Interdum et malesuada fames ac ante ipsum primis in
                  faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                  Sed non consequat neque. Etiam at lectus justo. Praesent eget imperdiet neque. Aenean maximus lorem sem,
                  nec sagittis neque tempor vitae.
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Dashboard);
