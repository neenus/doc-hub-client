import React from 'react'
import { Box } from '@mui/system'
import { Typography, Button, InputAdornment } from '@mui/material'
import TextInput from '../components/Input/Input.component'

const Home = () => {
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState([]);
  const [nameInput, setNameInput] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const fileInputRef = React.useRef("");

  const handleChange = e => setDescription(e.target.value);
  const fileSelectHandler = e => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile);
    setNameInput(selectedFile.name);
  }
  const AddFileHandler = React.useCallback(() => {
    setFiles(prevFiles => [...prevFiles, { file, description }]);
    setNameInput('');
    setDescription('');
    fileInputRef.current.value = "";
    setFile([]);
    console.log(files);
  }, [file, description, files]);

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
        <TextInput fullWidth
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
          sx={{ width: "50%", mt: 2 }}
          onClick={AddFileHandler}>
          Add File
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default Home