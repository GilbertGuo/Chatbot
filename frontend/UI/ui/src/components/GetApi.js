import React,{Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class GetApi extends Component{

    constructor(props){
        super(props);
        this.state={
            names: []
        }
    }

    /*componentWillMount() {
        const { steps } = this.props; //get all the array
        const { name } = steps;  //extract only id='name'

        this.setState({ name:name});
        //console.log(this.props);
    }*/

    componentDidMount() {

        //axios.get('http://localhost:9000/helloworld')
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response=>{
                this.setState({names:response.data})
            })
            .catch(error=>{
                console.log(error);
                this.setState({errorMsg:'Error retrieving data'})
            })
    }


    render() {
        const { names} =this.state;

        return (
            <div>
                <p>Get All Names from JSONPlaceholder</p>
                {
                    names.length ?
                        names.map(name=><div key={name.id}>{name.name}</div>):
                        null
                }

            </div>

        )
    }


}


GetApi.propTypes = {
    steps: PropTypes.object,
};

GetApi.defaultProps = {
    steps: undefined,
};

export default GetApi;
