import React, { Component } from 'react';
import './Chatbot.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import IconBar from './IconBar.js';
import { If, Then, Else } from 'react-if-elseif-else-render';

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
            errorMsg: '',
            // isLoading: true,
            // dataFetch:[]
        };
        this.clickEvent = this.clickEvent.bind(this);
    }

    componentDidMount() {
        if(this.props.location.state === undefined){
            const location = {
                pathname: '/Login',
                state: this.state
            };
            this.props.history.push(location);

        }
    }

    changeTextValue = e => {
        this.setState({ textValue: e.target.value });
    };

    /********** test only ***********************/
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
    };
    /************************************************************/

    /********** test only ***********************/
    getUserData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const body = await response.json();
        if (body) {
           this.setState((prevState)=>({chatArray:prevState.chatArray.concat({from:'chatbot',msg:body[0].name})}));
        } else{
            this.setState({errorMsg: 'Error retrieving data'});
        }
    };
    /************************************************************/




    query = () => {

        const username = this.props.location.state.username;
        const token = this.props.location.state.token;

        const message = {message: this.state.textValue, username: username};
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        };
        try {

            axios.post("http://localhost:8000/query", message, {headers: headers})
            // upon request is success sent
                .then(res => {
                    // update result in the state.

                    if (res.status === 200) {

                        this.setState({
                            chatArray: this.state.chatArray.concat({
                                from: 'chatbot',
                                msg: res.data.documents
                            })
                        });
                        console.log(res);
                    } else {
                        console.log("error");
                    }
                });
        } catch (err) {
            console.log(err);
            this.setState({errorMsg: 'Error posting data'});
        }

    };


    /********** test only ***********************/
    getDocumentList = async () => {
        // fetch data from mock database
        const data = require('./List/Mock.json');

        this.setState((prevState)=>({chatArray:prevState.chatArray.concat({from:'chatbot',
                msg:"document name: " + data.documents[0].document + " url: " + data.documents[0].url})}));
    };
    /************************************************************/


    clickEvent = () => {

        /** Once backend signin and google login are implement, we can leave the "For Goole Login Test" **/

        /***** For Google Login test ****************/
        //this.setState((prevState)=>({chatArray:prevState.chatArray.concat({from:this.props.location.state.username,msg:this.state.textValue})}));

        /***** For normal Login test(delete if finished implementing backend login for google and normal login ****************/
        this.setState((prevState)=>({chatArray:prevState.chatArray.concat({from:this.props.location.state.username,msg:this.state.textValue})}));


        /********** test only ***********************/
        if(this.state.textValue.includes("!")){
            this.postUserData();
            this.getUserData();

        }

        if(this.state.textValue.includes("document")){
            this.postUserData();
            this.getDocumentList();
        }

        /************************************************************/

        this.query();

        if (this.state.textValue !== '') {
            this.setState({ textValue: '' });
        }
    };

    render() {
        console.log(this.props.location);
        const {textValue,chatArray}=this.state;
        //console.log(chatArray.map(chat=>chat.msg));

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

                                    <div key={i}>
                                        <If condition={chat.from==='chatbot'}>
                                            <Then>
                                                <div className={chat.from}>
                                                    <Chip label={chat.from} variant="outlined"/>
                                                    <div className="message_inbox">
                                                    <Typography align='left' variant='body1'>{chat.msg}</Typography>
                                                    </div>
                                                </div>
                                            </Then>
                                        <Else>
                                            <div className="user">
                                                <div className="user_message">
                                                    <Typography align='left' variant='body1'>{chat.msg}</Typography>
                                                </div>
                                                <Chip label={chat.from} variant="outlined"/>
                                            </div>
                                        </Else>
                                        </If>
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
                     <div className="sub_menu">
                       <IconBar />
                    </div> 
                </Paper>
            </div>
        );
    }
}


export default Chatbot;
