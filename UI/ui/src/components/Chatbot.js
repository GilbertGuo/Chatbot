import React from 'react';
import './Chatbot.css';
import green from './green_icon.png';
import yellow from './yellow_icon.png';
import btn from './send-button.png';

function Chatbot() {
    return (
        <div className="chat_bot">
            <div>

            </div>
            <div className="message_container">
                <div className="container">
                    <img src={green}/>
                    <p>Hello. How are you today?</p>
                    <span className="time-right">11:00</span>
                </div>
                <div className="container darker">
                    <img src={yellow} className="right"/>
                    <p className="right">Hey! I'm fine. Thanks for asking!</p>
                    <span className="time-left">11:01</span>
                </div>
            </div>
            <div className="input_container">
                <input type="text" className="input_area" placeholder="Type Message..."/>
                <button className="btn"><img src={btn} /></button>
            </div>
        </div>
    );
}

export default Chatbot;
