import React,{Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Feedback.css';
import Container from '@material-ui/core/Container';
//import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {SentimentDissatisfied, SentimentSatisfied, SentimentVeryDissatisfied, SentimentVerySatisfied} from '@material-ui/icons';

/*Fake Feedback UI for testing the API and can be deleted.*/
class Feedback extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            feedback: ''
        };

        this.handlenameChange = this.handlenameChange.bind(this);
        this.handlefeedbackChange = this.handlefeedbackChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlenameChange(event) {
        this.setState({name: event.target.value});
    }

    handlefeedbackChange(event) {
        this.setState({feedback: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/posts',this.state)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            });

        this.setState({name: '',feedback:''});
    }

    render() {
        return (
            <div className="feedbackPage">
                <div className="Icon_rate">
                <h1>HOW IS YOUR FEELING?</h1>
                <Tooltip title='strongly unsatisfied'>
                    <IconButton className="Icon_style">
                        <SentimentVeryDissatisfied fontSize='large'/>
                    </IconButton >
                </Tooltip>
                <Tooltip title='unsatisfied'>
                    <IconButton aria-label="dislike" className="Icon_style" >
                         <SentimentDissatisfied fontSize='large'/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="cool">
                    <IconButton color="secondary" aria-label="Like" className="Icon_style" >
                        <SentimentSatisfied fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Tooltip title='very good'>
                    <IconButton color="secondary" aria-label="Like" >
                        <SentimentVerySatisfied fontSize='large' />
                    </IconButton>
                </Tooltip>
                </div>
                <h1>Leave Us Feedback</h1>
                <Container maxWidth="xs" >
                <form className="feedbackForm" onSubmit={this.handleSubmit}>
                    <TextField
                        id="filled-name"
                        label="Your Name"
                        value={this.state.name}
                        onChange={this.handlenameChange}
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                            id="filled-multiline-static"
                            label="Your feedback"
                            multiline
                            rows="10"
                            margin="normal"
                            variant="filled"
                            value={this.state.feedback} onChange={this.handlefeedbackChange}
                    />
                    <Button variant="contained" color="secondary" type="submit">
                        Submit
                    </Button>
                </form>
                </Container>
            </div>
        );
    }
}

export default Feedback;
