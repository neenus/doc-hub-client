import React, { useCallback, useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Typography, Button, InputAdornment, Backdrop } from '@mui/material'
import TextInput from '../components/Input/Input.component'
import FileList from '../components/FilesList/FilesList.component'
import CircularProgressWithLabel from "../components/CircularProgressWithLabel/CircularProgressWithLabel.component";
import axios from 'axios'

const Home = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const controller = useRef(new AbortController());

  const handleChange = e => setDescription(e.target.value);
  const fileSelectHandler = e => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
    setNameInput(selectedFile.name);
  }
  const AddFileHandler = useCallback(() => {
    let updatedFile = file;
    updatedFile.description = description;
    setFile(updatedFile);
    setFiles([...files, { description, file }]);
    setNameInput('');
    setDescription('');
    fileInputRef.current.value = "";
    setFile([]);
  }, [file, description, files]);

  const handleClear = useCallback(() => {
    setNameInput('');
    setFiles([]);
  }, []);

  const uploadCancelCb = useCallback(() => {
    controller.current.abort();
    setLoading(false);
    setFiles([]);
    setUploadProgress(0);
  }, []);

  const handleUpload = useCallback(async () => {
    const apiURL = 'http://192.168.64.9:7000/uploads';

    setLoading(true);
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(file.file.description, file.file);
    });

    try {
      const response = await axios({
        method: 'POST',
        url: apiURL,
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

      response.status === 200 && setFiles([]);

    } catch (err) {
      if (axios.isCancel(err)) {
        setUploadProgress(0);
      } else {
        setError({
          message: err.message,
          status: err.response.status
        })
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }

  }, [files]);

  return (
    <React.Fragment>
      <Box py={10} sx={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom sx={{ color: "#0B096A", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", lineHeigh: "22px", fontWeight: 700 }}>
          NR Accounting & Business Advisors
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#020126" }} >
          File upload request <br />
          Select a file and enter description to upload
        </Typography>
        <TextInput label='Description' value={description} handleChange={handleChange} />
        <TextInput
          label={nameInput ? "Selected File" : "Select a File"}
          variant="outlined"
          value={nameInput}
          required
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <Button component="label" onChange={fileSelectHandler}>
                  Browse
                  <input hidden accept="*" type="file" ref={fileInputRef} />
                </Button>
              </InputAdornment>,
          }} />
        <Button disabled={file.length === 0 || !description}
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={AddFileHandler}>
          Add File
        </Button>
      </Box>

      {files.length > 0 &&
        <React.Fragment>
          <FileList files={files} />
          <Button disabled={files.length === 0} variant="contained" color="primary" sx={{ my: 2, mr: 2 }} onClick={handleClear}> Clear </Button>
          <Button disabled={files.length === 0} variant="contained" color="primary" sx={{ my: 2, mr: 2 }} onClick={handleUpload}> Upload </Button>
        </React.Fragment>
      }

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