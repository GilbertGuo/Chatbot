import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Signup.css';

class Signup extends Component {
    render() {
        return (
            <Container maxWidth="xs" className="SignupContainer">
                <CssBaseline />
                <div className="signup_paper">
                    <Typography component="h1" variant="h5">
                        Sign up
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            id="confirm_password"
                            autoComplete="current-password"
                        />
                        <div className="SignupButtons">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="SignupSubmit"
                            >
                                Sign up
                            </Button>
                        </div>
                        <Grid container>
                            <Grid item>
                                <Link href="/Login" variant="body2">
                                    {"Already have an account? Log in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Signup;
