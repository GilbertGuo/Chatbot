import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Login.css';
import GoogleLogin from 'react-google-login';

class Login extends Component {

    constructor(props) {

        super(props);
        this.state = {
            errorMsg: '',
            username:'',
            txtusername:'',
            txtpassword:'',
            isAuthenticated: false,
            token: '',
            txtusernameError:'',
            txtpasswordError:''
        };

        this.handleusernameChange = this.handleusernameChange.bind(this);
        this.handlepasswordChange = this.handlepasswordChange.bind(this);
        this.signInSubmit = this.signInSubmit.bind(this);
    }

    handleusernameChange(event) {
        // if (event.target.value)
        this.setState({txtusername: event.target.value});
    }

    handlepasswordChange(event) {
        this.setState({txtpassword: event.target.value});
    }

    validate = () => {
        let txtusernameError = '';
        let txtpasswordError = '';

        if (!this.state.txtusername) {
            txtusernameError = "username can not be blank";
        }

        if (!this.state.txtpassword) {
            txtpasswordError = "invalid password";
        }

        if (txtusernameError || txtpasswordError) {
            this.setState({txtusernameError: txtusernameError, txtpasswordError: txtpasswordError});
            return false;
        }
        return true;

    };
    // the handler function for login
    signInSubmit(event){
        event.preventDefault();
        const isValid = this.validate();
        // get all user inputs
        if (isValid) {
            const {txtusername,txtpassword} = this.state;
            // send username and password to the backend
            this.sendSignIn(txtusername, txtpassword);
        }
    };


    sendSignIn = async (username, password) => {

        /************** uncomment this section once finished backend for signin *******************/

        /*const response = await fetch('http://localhost:8000/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (response.status !== 200) {
            if (response.status === 401) this.setState({
                errorMsg: "Username or password not correct..."
            });
            if (response.status === 500) this.setState({
                errorMsg: "Server side error, please try again later..."
            });
        } else {
            const body = await response.json();
            if (body) {
                // clean up error message
                this.setState({
                    errorMsg: '',
                    username: username,
                    isAuthenticated: true
                });
                // redirect to Home page
                const location = {
                    pathname: '/Chatbot',
                    state: this.state
                };
                this.props.history.push(location);
            }
        }*/

        /***************************test only************************/
        /*   remove below line after implementing backend for signup */
        const location = {
            pathname: '/Chatbot',
            state: this.state
        };
        this.props.history.push(location);
    };

    /********************************** Google Login section ************************/
    failureGoogle = (error) => {
        this.setState({
            errorMsg: 'Google Login Failed'
        });
    };

    responseGoogle = (response) => {

        console.log(response);
        // console.log(response.accessToken);
        // console.log(response.profileObj.name);


        /************** uncomment this section once finished backend for Google login *******************/

        /*const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});

        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };

        fetch('http://localhost:8000/api/v1/auth/google', options).then(r => {

            const token = r.headers.get('x-auth-token');
            r.json().then(user => {

                if (token) {
                    this.setState({isAuthenticated: true, username:user, token:token})
                }
            });
        })*/


        /***************************test only************************/
        /*   remove below line after implementing backend for signup */
        this.setState({isAuthenticated: true, username:response.profileObj.name, token:response.accessToken});

        const location = {
            pathname: '/Chatbot',
            state: this.state
        };
        this.props.history.push(location);

    };



    render() {
        //console.log(this.state);
        return (
            <Container maxWidth="xs" className="LoginContainer">
                <CssBaseline />
                <div className="login_paper">
                    <p>{ this.state.errorMsg }</p>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className="form" noValidate onSubmit={this.signInSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={this.state.txtusername}
                            onChange={this.handleusernameChange}
                            autoFocus
                        />
                        <div className="usernameError">{this.state.txtusernameError}</div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={this.state.txtpassword}
                            onChange={this.handlepasswordChange}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <div className="passwordError">{this.state.txtpasswordError}</div>
                        <div className="LoginButtons">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="LoginSubmit"
                                    >
                                    Log In
                            </Button>

                            {/*<Button
                                fullWidth
                                color="secondary"
                                variant="contained"
                                className="GoogleLogin"
                            >
                                Log in with Google
                            </Button>*/}

                            <GoogleLogin
                                clientId="385285346936-qodrif2b1q9f53k8ssbb81d2getrf3dd.apps.googleusercontent.com"
                                buttonText="Log in with Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.failureGoogle}
                            />

                        </div>
                        <Grid container>
                            <Grid item>
                                <Link href="/Signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Login;
