import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <Container maxWidth="xs" className="LoginContainer">
                <CssBaseline />
                <div className="login_paper">
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form className="form" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
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
                            <br></br>
                            <Button
                                fullWidth
                                color="secondary"
                                variant="contained"
                                className="GoogleLogin"
                            >
                                Log in with Google
                            </Button>
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
