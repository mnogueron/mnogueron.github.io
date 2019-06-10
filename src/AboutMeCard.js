import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 42,
    paddingRight: 42,
    backgroundColor: '#fff',
  },
})

class AboutMeCard extends Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container direction={ 'column' }>
        <Paper className={ classes.container }>
          <Typography variant="h4" style={{ marginBottom: 16 }}>
            About me
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium, arcu quis tincidunt euismod, dui quam sodales nisi, nec varius sem tellus nec turpis. Phasellus ac mattis augue, sed molestie ante. Mauris ullamcorper facilisis leo, nec pharetra lectus iaculis eu. Sed tempus vitae mi dignissim ultricies. Curabitur eu volutpat enim, vitae volutpat tellus. Donec molestie turpis quis sem gravida, ut vehicula diam commodo. Aliquam semper odio sed nisl pharetra ullamcorper. Etiam aliquam vulputate faucibus. Phasellus non convallis dui. Curabitur rhoncus lacus eleifend dui varius porta. Nam elementum porta augue, vel molestie sapien porta at. Mauris consequat lorem quis est hendrerit, nec porta dolor scelerisque. Sed non ipsum odio. Sed varius nunc a vestibulum consequat.
          </Typography>
        </Paper>
      </Grid>
    )
  }

}

export default withStyles(styles)(AboutMeCard)
