import React from 'react';
import './Hidden.css';
import Button from '@material-ui/core/Button';

const hidden = props => (
    <nav className="hidden_pull_down">
        <ul>
            <li>
                <Button href="/chatbot">Chatbot</Button>
            </li>
            <li>
                <Button href="/feedback">Give feedback</Button>
            </li>
            <li>
                <Button href="/admin">Admin</Button>
            </li>
        </ul>
    </nav>
)

export default hidden;
