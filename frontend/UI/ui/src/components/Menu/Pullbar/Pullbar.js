import React from 'react';
import Button from '@material-ui/core/Button';
import './Pullbar.css';
import Toggle from '../Toggle/Toggle';

const pullbar = props => (
    <header className="pullbar">
        <nav className="pullbar_nav"> 
             <div>
                 <Toggle click={props.clickHandler} />
             </div>
             <div className="bar_logo"><a href="/">Hi Guest</a></div>
             <div className="partial" />
             <div className="pull_items">
                 <ul>
                    <li><Button href="/Login">log in</Button></li>
                    <li><Button href="/Signup">sign up</Button></li>
                    <li><Button href="/Login">log out</Button></li>
                 </ul>
             </div>
        </nav>
    </header>
);
export default pullbar; 
