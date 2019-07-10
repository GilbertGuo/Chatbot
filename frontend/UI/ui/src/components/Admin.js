import React, {Component} from 'react';
import './Admin.css';
// import { makeStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import FeedList from './FeedbackList.js'

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploadedFiles: [],
            status: 0,
            selectedurl: null
        }

    }

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files[0];
        //define message container
        let err = '';
        // list allow mime type
        const types = ['application/pdf', 'application/msword', 'text/html', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

        if (types.every(type => files.type !== type)) {
            // create error message and assign to container
            err += files.name + ' is not a supported\n';
        }


        if (err !== '') { // if message not same old that mean has error
            event.target.value = null; // discard selected file
            console.log(err);
            toast.error(err, { autoClose: 1000 });
            return false;
        }
        return true;

    };


    fileSelectedHandler = event => {
        var files = event.target.files[0];

        if (this.checkMimeType(event)) {
            this.setState({
                selectedFile: files
            })
        }
    };

    fileUploadHandler = () => {

        if (this.state.selectedFile === null) {
            toast.error('upload fail', { autoClose: 1000 });
        } else {
            const data = new FormData();
            data.append('file', this.state.selectedFile);

            axios.post("http://localhost:8000/api/v1/documents/files", data)
                .then(res => { // then print response status
                    console.log(res);
                    toast.success('Upload file success', { autoClose: 1000 });
                    this.setState({
                        status: res.status,
                        uploadedFiles: this.state.uploadedFiles.concat(res.data.filename)
                    });
                })
                .catch(err => {
                    toast.error('Upload file fail', { autoClose: 1000 });
                })
        }
    };

    validateURL = (url) => {
        if ((url.indexOf("http://") === -1) && url.indexOf("https://") === -1) {
            toast.error('Wrong URL format', { autoClose: 1000 });
            return false;
        } else {
            return true;
        }
    };

    changeURLValue = e => {
        this.setState({ selectedurl: e.target.value });

    };

    URLUploadHandler = () => {

        if (this.state.selectedurl === null) {
            toast.error('upload fail', { autoClose: 1000 });
        } else {
            if (this.validateURL(this.state.selectedurl)) {
                console.log(this.state.selectedurl);

                const data = { url: this.state.selectedurl };
                axios.post("http://localhost:8000/api/v1/documents/urls", data)
                    .then(res => {
                        console.log(res);
                        toast.success('Upload url success', { autoClose: 1000 });

                    })
                    .catch(err => {
                        toast.error('Upload url fail', { autoClose: 1000 });
                    });
            }
        }




    };


    deleteHandler = fname => e => {
        console.log(fname.file);
        axios.delete("http://localhost:8000/api/v1/documents", { data: { filename: fname.file, username: "someone" } })
            .then(res => {
                toast.success(fname.file + ' is deleted');
                const uploadedFiles = this.state.uploadedFiles.filter(file => file !== fname.file);
                this.setState({ uploadedFiles: uploadedFiles });
            })
            .catch(err => {
                //toast.error(fname.file+' deleted fail');
                toast.success(fname.file + ' is deleted');
            });

    };


    render() {

        const { status, uploadedFiles } = this.state;
        //console.log(urlvalue);
        return (
            <div className="adminPage">
                <div className="form-group">
                    <ToastContainer />
                </div>

                <div className="uploadFile adminPageItem">
                    <h2>Document Upload</h2>
                    <input type="file" onChange={this.fileSelectedHandler} />
                    <Button variant="contained" component="span" onClick={this.fileUploadHandler}>
                        Upload
                    </Button>
                </div>

                <div className="createURL adminPageItem">
                    <Container maxWidth="xs" id="docURL">
                        <h2>Document URL</h2>
                        <input type="url" placeholder="Type URL" name="url" id="url"
                               size="30" onChange={this.changeURLValue} />

                        {/*<TextField
                            id="outlined-with-placeholder"
                            label="URL"
                            placeholder="Type URL"
                            margin="normal"
                            variant="outlined"
                            value={selectedurl}
                            onChange={this.changeURLValue}
                        />*/}
                        <Button variant="contained" component="span" onClick={this.URLUploadHandler}>
                            Upload
                        </Button>
                    </Container>
                </div>

                <div className="indexerView adminPageItem">
                    <h1>Uploaded Documents</h1>
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

                            {
                                status === 200 ?
                                    uploadedFiles.map((file, i) =>
                                        <TableBody key={i}>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    {file}
                                                </TableCell>
                                                <TableCell align="right">''</TableCell>
                                                <TableCell align="right">''</TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="Delete" onClick={this.deleteHandler({ file })}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ) : null
                            }
                        </Table>
                    </Paper>
                </div>
                <div className="Feedback_List">
                <Container maxWidth="xs" id="FeedList">
                    <h1>Feedback box</h1>
                    <FeedList/>
                </Container>
                </div>
            </div>
        );
    }
}

export default Admin;
