import React, { Component } from 'react';
import './App.css';
import Admin from './components/Admin';
import Chatbot from './components/Chatbot';
import Pullbar from './components/Meun/Pullbar/Pullbar';
import Hidden from './components/Meun/Hidden/Hidden';
import Background from './components/Meun/Backgroun/Background';
import Feedback from './components/Feedback'



class App extends Component{
    state = {
        hiddenStatus: false
    };

    pullToggle = () =>{
        this.setState((last) => {
            return{hiddenStatus: last};
        });
    };

    closeMenu =() =>{
        this.setState({hiddenStatus: false});
    };

    render(){
        let hidden;
        let close;
        if(this.state.hiddenStatus){
            hidden = <Hidden />;
            close = <Background click={this.closeMenu}/>;
        }
        return (
            <div className="App">
                <Pullbar clickHandler={this.pullToggle} />
                {hidden}
                {close}
                <Admin />
                <Feedback />   {/*fake feedback UI for api testing only*/}
                <Chatbot />

            </div>
        );
    }
}
export default App;
