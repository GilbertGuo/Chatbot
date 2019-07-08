import React, { Component } from 'react';
import './Chatbot.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { toast } from 'react-toastify';

class Chatbot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            chatArray: [{
                from: 'chatbot',
                msg: 'hi'
            }
            ],
            botmsgs: [],
            errorMsg: '',
            // isLoading: true,
            // dataFetch:[]
        };
        this.clickEvent = this.clickEvent.bind(this);
    }

    changeTextValue = e => {
        this.setState({ textValue: e.target.value });
    };


    postUserData = () => {
        const name = { name: this.state.textValue, username: "kliang" };
        try {
            axios.post("https://jsonplaceholder.typicode.com/users", name)
                // upon request is success sent
                .then(res => {
                    // update result in the state.
                    console.log(res)
                });
        } catch (err) {
            console.log(err);
            this.setState({ errorMsg: 'Error posting data' });
        }
        // this.getUserData();

    };

    getUserData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const body = await response.json();
        if (body) {
           this.setState((prevState)=>({chatArray:prevState.chatArray.concat({from:'chatbot',msg:body[0].name})}));
        } else{
            this.setState({errorMsg: 'Error retrieving data'});
        }
    };

    query = () => {
        const message = { message: this.state.textValue, username: "kliang" };
        try {
            axios.post("http://localhost:8000/query", message)
                // upon request is success sent
                .then(res => {
                    // update result in the state.
                    this.setState({ chatArray: this.state.chatArray.concat({ from: 'chatbot', msg: res.data.documents }) });
                    console.log(res);
                });
        } catch (err) {
            console.log(err);
            this.setState({ errorMsg: 'Error posting data' });
        }
    };


    getDocumentList = async () => {
        // fetch data from mock database
        const data = require('./List/Mock.json');

        this.setState((prevState)=>({chatArray:prevState.chatArray.concat({from:'chatbot',
                msg:"document name: " + data.documents[0].document + " url: " + data.documents[0].url})}));
    };


    clickEvent = () => {
        this.setState((prevState)=>({chatArray:prevState.chatArray.concat({from:'user',msg:this.state.textValue})}));
        if(this.state.textValue.includes("!")){
            this.postUserData();
            this.getUserData();

        }

        if(this.state.textValue.includes("document")){
            this.postUserData();
            this.getDocumentList();
        }

        // if (this.state.textValue.includes("document")) {
        //     this.getDocumentList();
        // }
        this.query();

        if (this.state.textValue !== '') {
            this.setState({ textValue: '' });
        }
    };

    render() {
        // const { textValue, chatArray } = this.state;
        //console.log(this.state.botmsgs);
        // const {textValue,chatArray}=this.state;
        //console.log(chatArray.map(chat=>chat.msg));
        //this.state.botmsgs.map(m=>console.log(m.name));
        return (
            <div className="chat_bot">
                <Paper className="root">
                    <Typography variant="h4" component="h4">
                        Chatbot
                    </Typography>
                    <Typography variant="h5" component="h5">
                        Topic Placeholder
                    </Typography>
                    <div className="flex">

                        <div className="chatWindow">
                            {
                                chatArray.length?
                                chatArray.map((chat, i) =>
                                    // if (chat.from == chatbot) {
                                        <div className={chat.from} key={i}>
                                            <Chip label={chat.from} variant="outlined"/>
                                            <Typography align='left' variant='body1'>{chat.msg}</Typography>
                                        </div>

                                    ) : null
                            }
                        </div>
                    </div>
                    <div className="flex2">

                        <TextField
                            label="Type message..."
                            className="chatBox"
                            value={textValue}
                            onChange={this.changeTextValue}
                        />
                        <Button variant="contained" color="primary" className="button" onClick={this.clickEvent}>
                            Send
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}


export default Chatbot;
