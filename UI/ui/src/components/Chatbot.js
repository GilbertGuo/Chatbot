import React from 'react';
import './Chatbot.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2),
    },

    flex:{
        display: 'flex',
        height: '300px',
        alignItems: 'center'
    },

    chatWindow: {
        width: '100%',
        padding: '10px'
    },

    chatBox: {
        width: '85%'
    },

    button: {
        width: '15%'
    }
}));

function Chatbot() {

    const classes = useStyles();
    const [textValue, changeTextValue] = React.useState();

    return (
        <div className="chat_bot">
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chatbot
                </Typography>
                <Typography variant="h5" component="h5">
                    Topic Placeholder
                </Typography>
                <div className={classes.flex}>

                    <div className={classes.chatWindow}>
                        {
                            [{from:'chatbot', msg:'hi'}].map((chat, i) =>(
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip} variant="outlined" />
                                    <Typography variant='p'>{chat.msg}</Typography>
                                </div>

                            ))
                        }

                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Type message..."
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => changeTextValue(e.target.value)}
                    />
                    <Button variant="contained" color="primary" className={classes.button}>
                        Send
                    </Button>

                </div>
            </Paper>
        </div>
    );
}

// function btnWasClicked(e){
//     e.preventDefault();
//     alert('clicked');
// }

export default Chatbot;
