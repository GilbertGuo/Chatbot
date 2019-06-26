import React,{Component} from 'react';
import ChatBot from 'react-simple-chatbot';
import Api from "./Api";

class Chat extends Component{

    constructor(props){
        super(props);
        this.state={
            msg: [
                {
                    id: '0',
                    message: 'Hello!',
                    trigger: '1',
                },
                {
                    id: '1',
                    message: 'What is your name?!',
                    trigger: '2',
                },
                {
                    id: '2',
                    user: true,
                    trigger: '3',
                },
                {
                    id: '3',
                    message: 'Hi {previousValue}, nice to meet you!',
                    trigger: '4',
                },
                {
                    id: '4',
                    component: <Api />,
                    asMessage: true,
                    trigger: 'end-message',
                },
                {
                    id: 'end-message',
                    message: 'Thanks! Your data was submitted successfully!',
                    end: true,
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
