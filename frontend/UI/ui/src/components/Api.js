import React,{Component} from 'react';
import axios from 'axios';

class Api extends Component{

    constructor(props){
        super(props);
        this.state={
            posts:''

        }
    }

    componentDidMount() {
        axios.get('http://localhost:9000/helloworld')
            .then(response=>{
                console.log(response);
                this.setState({posts:response.data})
            })
            .catch(error=>{
                console.log(error);
                this.setState({errorMsg:'Error retrieving data'})
            })
    }


    render() {
        const {posts}=this.state;
        return (
            <div>
                {
                    posts ?
                        <div>{posts.response}</div>:null
                }
            </div>
        )
    }


}

export default Api;
