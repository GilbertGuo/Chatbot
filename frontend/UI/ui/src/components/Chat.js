import React,{Component} from 'react';
import ChatBot from 'react-simple-chatbot';
import GetApi from "./GetApi";
import PostAPI from "./PostAPI";

class Chat extends Component{

    constructor(props){
        super(props);
        this.state={
            msg: [
                {
                    id: '0',
                    message: 'Hello!',
                    trigger: 'first',
                },
                {
                    id: 'first',
                    message: 'What is your name?!',
                    trigger: 'name',
                },
                {
                    id: 'name',
                    user: true,
                    trigger: '3',
                },
                {
                    id: '3',
                    message: 'What is your username',
                    trigger: 'username',
                },
                {
                    id: 'username',
                    user: true,
                    trigger: '4',
                },
                {
                    id: '4',
                    message: 'What is your email',
                    trigger: 'email',
                },
                {
                    id: 'email',
                    user: true,
                    trigger: '5',
                },
                {
                    id: '5',
                    component: <PostAPI />,
                    asMessage: true,
                    trigger: '6',
                },
                {
                    id: '6',
                    component: <GetApi />,
                    asMessage: true,
                    end:true,
                },
            ]

        };

    }


    render() {
        const msg=this.state.msg;
        return (
            <div>
                <ChatBot headerTitle="ChatBot" steps={msg} />
            </div>
        );
    }
}

export default Chat;
