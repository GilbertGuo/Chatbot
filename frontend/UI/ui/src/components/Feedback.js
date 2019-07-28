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
import Hidden from "./Menu/Hidden/Hidden";
import Background from "./Menu/Background/Background";
import Pullbar from "./Menu/Pullbar/Pullbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


/*Fake Feedback UI for testing the API and can be deleted.*/
class Feedback extends Component{

    constructor(props) {
        super(props);
        this.state = {
            hiddenStatus: false,
            name:'',
            feedback: ''
        };

        this.handlenameChange = this.handlenameChange.bind(this);
        this.handlefeedbackChange = this.handlefeedbackChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    pullToggle = () =>{
        this.setState((last) => {
            return{hiddenStatus: last};
        });
    };

    closeMenu =() =>{
        this.setState({hiddenStatus: false});
    };

    handlenameChange(event) {
        this.setState({name: event.target.value});
    }

    handlefeedbackChange(event) {
        this.setState({feedback: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const feedback = { message: this.state.feedback };
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Cookies.get('token')
        };
        axios.post('http://localhost:8000/feedback',feedback, {headers: headers})
            .then(response=>{
                if (response.status === 200){
                    toast.success('Feedback successfully sent!', { autoClose: 1000 });
                }
                // console.log(response)
            })
            .catch(error=>{
                console.log(error);
                toast.error(error, { autoClose: 1000 });
            });

        this.setState({name: '',feedback:''});
    }

    render() {
        let hidden;
        let close;
        if(this.state.hiddenStatus){
            hidden = <Hidden />;
            close = <Background click={this.closeMenu}/>;
        }
        return (
            <div className="feedbackPage">
                <Pullbar clickHandler={this.pullToggle}/>
                {hidden}
                {close}
                <div className="form-group">
                    <ToastContainer />
                </div>

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
