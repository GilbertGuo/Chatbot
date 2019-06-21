import React from 'react';
import './Hidden.css';
import Button from '@material-ui/core/Button';

const hidden = props => (
    <nav className="hidden_pull_down">
        <ul>
            <li>
                <Button href="/">Contact Us</Button>
            </li>
            <li>
                <Button href="/">Call Us</Button>
            </li>
            <li>
                <Button href="/">Find out more</Button>
            </li>
        </ul>
    </nav>
)

export default hidden;