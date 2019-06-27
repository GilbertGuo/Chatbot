import React,{Component} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

class PostAPI extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            username:'',
            email: ''
        }
    }

    componentWillMount() {
        const { steps } = this.props; //get all the array
        const { name,username,email } = steps;  //extract only id='name'

        this.setState({ name:name.value,username:username.value,email:email.value});

    }
    componentDidMount() {

        axios.post('https://jsonplaceholder.typicode.com/users',this.state)
            .then(response=>{
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            })
    }



    render() {
        const {name,username,email}=this.state;
        return (
            <div>
                name: {name}
                <br/>
                username:{username}
                <br/>
                email:{email}
            </div>

        )
    }


}

PostAPI.propTypes = {
    steps: PropTypes.object,
};

PostAPI.defaultProps = {
    steps: undefined,
};

export default PostAPI;
