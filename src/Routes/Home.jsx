import React, { useCallback, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Typography, Button, Backdrop } from '@mui/material'
import TextInput from '../components/Input/Input.component'
import FileList from '../components/FilesList/FilesList.component'
import CircularProgressWithLabel from "../components/CircularProgressWithLabel/CircularProgressWithLabel.component";
import SnackbarComponent from '../components/Snackbar/Snackbar.component'
import axios from 'axios'
import { useDropzone } from 'react-dropzone';

const Home = () => {
  const [userInputData, setUserInputData] = useState({
    description: '',
    userName: '',
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const controller = useRef(new AbortController());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles].map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }
  const handleChange = e => setUserInputData({ ...userInputData, [e.target.name]: e.target.value });

  const handleClear = useCallback(() => {
    setFiles([]);
  }, []);

  const uploadCancelCb = useCallback(() => {
    controller.current.abort();
    setLoading(false);
    setFiles([]);
    setUploadProgress(0);
  }, []);

  const handleUpload = useCallback(async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", userInputData.userName);
    formData.append("description", userInputData.description);
    files.forEach(file => {
      formData.append("files", file);
    });
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_BASE_URL}/upload`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          setUploadProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
        signal: controller.current.signal,
      });

      if (response.status === 200) {
        setSnackbarOpen(true);
        setSnackbarMessage(response.data.message);
        setSnackbarSeverity('success');
        setFiles([]);
        setUserInputData({
          description: '',
          userName: '',
        });
      }

    } catch (err) {
      if (axios.isCancel(err)) {
        setSnackbarOpen(true);
        setSnackbarMessage('Upload cancelled');
        setSnackbarSeverity('info');
        setUploadProgress(0);
      } else {
        setError({ error: true, message: err.response.data.message })
        setSnackbarOpen(true);
        setSnackbarMessage(error.message);
        setSnackbarSeverity('error');
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }

  }, [files, error, userInputData]);

  const handleDelete = useCallback(file => setFiles(files.filter(f => f.name !== file.name)), [files]);

  return (
    <React.Fragment>
      <Box py={5} sx={{ textAlign: "center" }}>
        <SnackbarComponent open={snackbarOpen} handleClose={handleClose} message={snackbarMessage} severity={snackbarSeverity} />
        <Typography variant="h5" gutterBottom sx={{ color: "#0B096A", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", lineHeigh: "22px", fontWeight: 700 }}>
          NR Accounting & Business Advisors
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#020126" }} >
          Fill out the below fields and select files to upload.
        </Typography>
        <TextInput autoComplete="off" required label='Name' name="userName" autoFocus value={userInputData.userName} handleChange={handleChange} placeholder="Enter Your name" />
        <TextInput autoComplete="off" required label='Description' name="description" multiline rows={3} value={userInputData.description} handleChange={handleChange} placeholder="Enter brief discription of what you will be uploading" />
      </Box>


      <Box className="container" mb={5}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Box>

      <Box>
        <FileList files={files} handleDelete={handleDelete} />
        <Button disabled={!files.length || !userInputData.userName || !userInputData.description} variant="contained" color="primary" sx={{ my: 2, mr: 2 }} onClick={handleClear}> Clear </Button>
        <Button disabled={!files.length || !userInputData.userName || !userInputData.description} variant="contained" color="primary" sx={{ my: 2, mr: 2 }} onClick={handleUpload}> Upload </Button>
      </Box>

      {loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgressWithLabel progress={uploadProgress} onCancel={uploadCancelCb} />
        </Backdrop>
      }
    </React.Fragment>
  )
}

export default Home;