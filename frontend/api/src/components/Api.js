import React,{Component} from 'react';
import axios from 'axios';

class Api extends Component{

    constructor(props){
        super(props);
        this.state={
            result:''

        }
    }
    componentDidMount() {
        axios.get('http://localhost:9000/helloworld')
            .then(response=>{
                this.setState({result:response.data})
            })
            .catch(error=>{
                this.setState({errorMsg:'Error retrieving data'})
            })
    }
    render() {
        const {result}=this.state;
        return (
            <div>
                Result of GET:
                {
                    result ?
                        <div>{result.response}</div>:null
                }
            </div>
        )
    }
}
export default Api;
