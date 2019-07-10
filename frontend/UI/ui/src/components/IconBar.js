import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Favorite from '@material-ui/icons/Favorite'
import History from '@material-ui/icons/HistoryRounded'
import ThumbDownAlt from '@material-ui/icons/ThumbDownAltRounded'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAltRounded'


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}));

export default function IconButtons() {
  const classes = useStyles();

  return (
    <div>
      <IconButton className={classes.button} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" className={classes.button} aria-label="Like" >
        <Favorite />
      </IconButton>
      <IconButton className={classes.button} aria-label="Delete">
        <History />
      </IconButton>
      <IconButton color="default" className={classes.button} aria-label="Add to shopping cart" >
        <ThumbDownAlt />
      </IconButton>
      <IconButton color="default" className={classes.button} aria-label="Add to shopping cart" >
        <ThumbUpAlt />
      </IconButton>
    </div>
  );
}