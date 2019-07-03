import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import LinkedInIcon from '../../assets/LinkedInIcon'
import GitHubIcon from '../../assets/GitHubIcon'
import FacebookIcon from '../../assets/FacebookIcon'
import MailIcon from '@material-ui/icons/Mail'

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  text: {
    fontWeight: 300,
    whiteSpace: 'pre-wrap',
    marginBottom: theme.spacing(2),
  },
}))

const openNewTab = (url) => {
  const win = window.open(url, '_blank')
  win.focus()
}
const openGitHub = () => openNewTab('https://github.com/mnogueron')
const openEmail = () => window.location = 'mailto:matthieu.nogueron@gmail.com'
const openLinkedIn = () => openNewTab('https://www.linkedin.com/in/matthieu-nogueron/')
const openFacebook = () => openNewTab('https://www.facebook.com/matthieu.nogueron')

const Contact = (props) => {
  const classes = useStyles(props)
  return (
    <div>
      <Typography variant={'h4'} className={classes.title}>
        CONTACT
      </Typography>

      <Typography variant={'h5'} className={classes.text}>
        {'If you are interested in my profile, want to discuss about sustainable development, French culture or just want to offer me a coffee, you can contact me on the following platforms:'}
      </Typography>

      <Grid container justify={'center'} alignItems={'center'}>

        <IconButton onClick={openGitHub}>
          <GitHubIcon fontSize={'large'} />
        </IconButton>

        <IconButton onClick={openLinkedIn}>
          <LinkedInIcon fontSize={'large'} />
        </IconButton>

        <IconButton onClick={openEmail}>
          <MailIcon fontSize={'large'} />
        </IconButton>

        <IconButton onClick={openFacebook}>
          <FacebookIcon fontSize={'large'} />
        </IconButton>
      </Grid>
    </div>
  )
}

export default Contact
