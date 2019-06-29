import React, {Component} from 'react';
import './Admin.css';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
// import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// import axios from 'axios';

class Admin extends Component {

    state = {
        selectedFile: null
    };

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    };

    fileUploadHandler = () => {
        const fd = new FormData();
        console.log(fd);
        // axios.post()
    };

    URLInputHandler = () => {

    };

    deleteHandler = () => {

    };

    createData(name, calories, fat) {
        return {name, calories, fat};
    }

    render() {
        const rows = [
            this.createData('Frozen yoghurt', 159, 6.0),
            this.createData('Ice cream sandwich', 237, 9.0),
            this.createData('Eclair', 262, 16.0),
            this.createData('Cupcake', 305, 3.7),
            this.createData('Gingerbread', 356, 16.0),
        ];
        return (
            <div className="adminPage">
                <div className="uploadFile adminPageItem">
                    <h2>Document Upload</h2>
                    <input type="file" onChange={this.fileSelectedHandler}/>
                    <Button variant="contained" component="span" onClick={this.fileUploadHandler()}>
                        Upload
                    </Button>
                </div>

                <div className="createURL adminPageItem">
                    <FormGroup >
                        <h2>Document URL</h2>
                        <TextField
                            id="outlined-with-placeholder"
                            label="URL"
                            placeholder="Type URL"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button variant="contained" component="span" onClick={this.URLInputHandler}>
                            Upload
                        </Button>
                    </FormGroup>
                </div>

                <div className="indexerView adminPageItem">
                    <Paper className="classes.paper">
                        <Table className="classes.table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Document</TableCell>
                                    <TableCell align="right">User</TableCell>
                                    <TableCell align="right">Document_modification</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="Delete" onClick={this.deleteHandler}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

            </div>
        );
    }
}

export default Admin;
