import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Fab from '@material-ui/core/Fab'
import TranslateIcon from '@material-ui/icons/Translate'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { setLocale } from '../actions/appActions'

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
})

const TranslateButton = (props) => {
  const classes = useStyles(props)
  const dispatch = useDispatch()
  const locale = useSelector(state => state.app.locale)
  const [anchorEl, setAnchorEl] = useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function _setLocale(newLocale) {
    return () => {
      dispatch(setLocale(newLocale))
      handleClose()
    }
  }

  return (
    <React.Fragment>
      <Fab size={'medium'} color={'primary'} className={classes.root} onClick={handleClick}>
        <TranslateIcon />
      </Fab>

      <Menu
        id="language-selection"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={_setLocale('en')}
          selected={locale === 'en'}
        >
          {'🇺🇸 English '}
        </MenuItem>
        <MenuItem
          onClick={_setLocale('fr')}
          selected={locale === 'fr'}
        >
          {'🇫🇷  Français'}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default TranslateButton
