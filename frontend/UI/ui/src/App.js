import React, { Component } from 'react';
import './App.css';
import Admin from './components/Admin';
import Chatbot from './components/Chatbot';
import Pullbar from './components/Menu/Pullbar/Pullbar';
import Hidden from './components/Menu/Hidden/Hidden';
import Background from './components/Menu/Background/Background';
import Feedback from './components/Feedback';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";



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
            <Router>
                <div className="App">
                    <Pullbar clickHandler={this.pullToggle} />
                    {hidden}
                    {close}
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/admin" component={Admin} />
                    <Route path="/chatbot" component={Chatbot} />
                    <Route path="/feedback" component={Feedback} />
                </div>
            </Router>
        );
    }
}
export default App;
