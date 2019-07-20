import React, { Component } from 'react';
import './Chatbot.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Cookies from 'js-cookie';
// import IconBar from './IconBar.js';
import { If, Then, Else } from 'react-if-elseif-else-render';

class Chatbot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            chatArray: [{ from: null, msg: null }]

        };

        this.clickEvent = this.clickEvent.bind(this);
    }

    componentDidMount() {
        if (!Cookies.get('token')) {
            const location = {
                pathname: '/Login'
            };
            this.props.history.push(location);
        } else {

            let prechatArray = JSON.parse(sessionStorage.getItem('chatArray'));

            prechatArray.map(chat => {
                this.setState((prevState) => ({ chatArray: prevState.chatArray.concat({ from: chat.from, msg: chat.msg }) }));
                return null;
            });
        }
    }

    changeTextValue = e => {
        this.setState({ textValue: e.target.value });
    };

    changeMsg = () => {
        // {this.chat.msg}
    };
    /********** test only ***********************/
    postUserData = () => {
        const name = { name: this.state.textValue, username: Cookies.get('username') };
        try {
            axios.post("https://jsonplaceholder.typicode.com/users", name)
                // upon request is success sent
                .then(res => {
                    // update result in the state.
                    console.log(res)
                });
        } catch (err) {
            console.log(err);
        }
    };
    /************************************************************/

    /********** test only ***********************/
    getUserData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const body = await response.json();
        if (body) {
            this.setState((prevState) => ({ chatArray: prevState.chatArray.concat({ from: 'chatbot', msg: body[0].name }) }), () => {
                sessionStorage.setItem("chatArray", JSON.stringify(this.state.chatArray));
            });
        } else {
            console.log("error");
        }
    };
    /************************************************************/




    query = () => {

        const message = { message: this.state.textValue, username: Cookies.get('username') };
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Cookies.get('token')
        };
        try {

            axios.post("http://localhost:8000/query", message, { headers: headers })
                // upon request is success sent
                .then(res => {
                    // update result in the state.

                    if (res.status === 200) {
                        if(res.data.message){
                            this.setState((prevState) => ({ chatArray: prevState.chatArray.concat({ from: 'chatbot', msg: res.data.message }) }), () => {
                                sessionStorage.setItem("chatArray", JSON.stringify(this.state.chatArray));
                            });                        }
                        if(res.data.content) {
                            this.setState((prevState) => ({ chatArray: prevState.chatArray.concat({ from: 'chatbot', msg: res.data.content }) }), () => {
                                sessionStorage.setItem("chatArray", JSON.stringify(this.state.chatArray));
                            });                        }
                        console.log(res);
                        // this.setState((prevState) => ({ chatArray: prevState.chatArray.concat({ from: 'chatbot', msg: res.data.documents }) }), () => {
                        //     sessionStorage.setItem("chatArray", JSON.stringify(this.state.chatArray));
                        // });
                        /* this.setState({
                             chatArray: this.state.chatArray.concat({
                                 from: 'chatbot',
                                 msg: res.data.documents
                             })
                         });*/
                        console.log(res);
                    } else {
                        console.log("error");
                    }
                });
        } catch (err) {
            console.log("error");
        }

    };


    /********** test only ***********************/
    getDocumentList = async () => {
        // fetch data from mock database
        const data = require('./List/Mock.json');

        this.setState((prevState) => ({
            chatArray: prevState.chatArray.concat({
                from: 'chatbot',
                msg: "document name: " + data.documents[0].document + " url: " + data.documents[0].url
            })
        }), () => {
            sessionStorage.setItem("chatArray", JSON.stringify(this.state.chatArray));
        });
    };
    /************************************************************/


    clickEvent = () => {

        if (!Cookies.get('token')) {
            const location = {
                pathname: '/Login'
            };
            this.props.history.push(location);
        } else {

            this.setState((prevState) => ({
                chatArray: prevState.chatArray.concat({
                    from: Cookies.get('username'),
                    msg: this.state.textValue
                })
            }), () => {
                sessionStorage.setItem("chatArray", JSON.stringify(this.state.chatArray));
            });


            /********** test only ***********************/
            if (this.state.textValue.includes("!")) {
                this.postUserData();
                this.getUserData();

            }

            if (this.state.textValue.includes("document")) {
                this.postUserData();
                this.getDocumentList();
            }

            /************************************************************/

            this.query();

            if (this.state.textValue !== '') {
                this.setState({ textValue: '' });
            }
        }
    };

    render() {
        //console.log(this.props.location);
        const { textValue, chatArray } = this.state;
        //console.log(chatArray);

        return (
            <div className="chat_bot">
                <Paper className="root">
                    <Typography variant="h4" component="h4">
                        Chatbot
                    </Typography>
                    {/*<Typography variant="h5" component="h5">*/}
                    {/*DFI*/}
                    {/*</Typography>*/}
                    <div className="flex">
                        <div className="chatWindow">
                            {
                                chatArray.length ?
                                    chatArray.map((chat, i) =>

                                        <div key={i}>
                                            <If condition={chat.from === 'chatbot'}>
                                                <Then>
                                                    <div className={chat.from}>
                                                        <Chip label={chat.from} variant="outlined" />
                                                        <div className="message_inbox">
                                                            <Typography align='left' variant='body1'>{chat.msg}</Typography>
                                                        </div>
                                                    </div>
                                                </Then>
                                                <Else>
                                                    <If condition={chat.from !== null}>
                                                        <Then>
                                                            <div className="user">
                                                                <div className="user_message">
                                                                    <Typography align='left' variant='body1'>{chat.msg}</Typography>
                                                                </div>
                                                                <Chip label={chat.from} variant="outlined" />
                                                            </div>
                                                        </Then>
                                                    </If>
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
                </Paper>
            </div>
        );
    }
}


export default Chatbot;
