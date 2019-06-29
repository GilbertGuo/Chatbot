import React, { Component } from 'react';
import './Admin.css';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
                    <button onClick={this.fileUploadHandler}>Upload</button>
                </div>

                <div className="createURL adminPageItem">
                    <h2>Document URL</h2>
                    <input type="text"/>
                    <button onClick={this.URLInputHandler}>Create</button>
                </div>

                <div className="indexerView adminPageItem">
                    <Paper className="classes.paper">
                        <Table className="classes.table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User</TableCell>
                                    <TableCell align="right">Document</TableCell>
                                    <TableCell align="right">Docment_modification</TableCell>
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
                                            <button onClick={this.deleteHandler}>x</button>
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
