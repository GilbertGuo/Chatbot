import React,{Component} from 'react';
import axios from 'axios';


/*Fake Feedback UI for testing the API and can be deleted.*/
class MockFeedbackapi extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            feedback: ''
        };

        this.handlenameChange = this.handlenameChange.bind(this);
        this.handlefeedbackChange = this.handlefeedbackChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlenameChange(event) {
        this.setState({name: event.target.value});
    }

    handlefeedbackChange(event) {
        this.setState({feedback: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/posts',this.state)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            });

        this.setState({name: '',feedback:''});
    }

    render() {
        return (
            <div>
                <h1>Feedback</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handlenameChange} />
                    </label>
                    <br/>
                    <label>
                        Feedback:
                        <textarea value={this.state.feedback} onChange={this.handlefeedbackChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default MockFeedbackapi;
