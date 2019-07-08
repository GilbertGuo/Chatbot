import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCameraSharp';
import Button from '@material-ui/core/Button';
import Favorite from '@material-ui/icons/Favorite'
import History from '@material-ui/icons/HistoryRounded'
import Folder from '@material-ui/icons/FolderRounded'
import ThumbDownAlt from '@material-ui/icons/ThumbDownAltRounded'
import ThumbUpAlt from '@material-ui/icons/ThumbUpAltRounded'
import { BrowserRouter as Router, Route} from 'react-router-dom';


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
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          className={classes.button}
          aria-label="Upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <input accept="file/*" className={classes.input} id="text-button-file" multiple type="file"/>
      <label htmlFor="text-button-file">
        <IconButton color='primary' component="span" className={classes.button}>
          <Folder/>
        </IconButton>
      </label>
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