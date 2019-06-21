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
             <div className="bar_logo"><a href="/">Hi CSCC01</a></div>
             <div className="partial" />
             <div className="pull_items">
                 <ul>
                    <li><Button href="/">log in</Button></li>
                    <li><Button href="/">sign in</Button></li>
                    <li><Button href="/">log out</Button></li>
                 </ul>
             </div>
        </nav>
    </header>
);
export default pullbar; 