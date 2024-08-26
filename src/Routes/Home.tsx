import React, { useCallback, useRef, useState } from "react";
import { Box } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography, Button, Backdrop } from "@mui/material";
import TextInput from "../components/Input/Input.component";
import FileList from "../components/FilesList/FilesList.component";
import CircularProgressWithLabel from "../components/CircularProgressWithLabel/CircularProgressWithLabel.component";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import useToast from "../hooks/useToast.ts";

const Home = () => {
  const notify = useToast();

  const [userInputData, setUserInputData] = useState({
    description: "",
    userName: ""
  });
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const controller = useRef(new AbortController());

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles].map(file => Object.assign(file)));
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInputData({ ...userInputData, [e.target.name]: e.target.value });

  const handleClear = useCallback(() => setFiles([]), []);

  const uploadCancelCb = useCallback(() => {
    controller.current.abort();
    setLoading(false);
    setFiles([]);
    setUploadProgress(0);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!files.length || !userInputData.userName || !userInputData.description)
      return notify({
        message:
          "Please fill out all required fields and select files to upload",
        type: "error"
      });
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", userInputData.userName);
    formData.append("description", userInputData.description);
    files.forEach(file => {
      formData.append("files", file);
    });
    try {
      const baseUrl = import.meta.env.MODE === "production"
        ? import.meta.env.VITE_API_BASE_URL_PROD
        : import.meta.env.VITE_API_BASE_URL_DEV;
      const response = await axios({
        method: "POST",
        url: `${baseUrl}/upload`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          progressEvent?.loaded &&
            setUploadProgress(
              parseInt(
                Math.round(
                  ((progressEvent.loaded * 100) /
                    (progressEvent.total || 1)) as number
                ).toString()
              )
            );
        },
        signal: controller.current.signal
      });

      if (response.status === 200) {
        notify({
          message: response.data.message,
          type: "success"
        });
        setFiles([]);
        setUserInputData({
          description: "",
          userName: ""
        });
      }
    } catch (err: any) {
      if (axios.isCancel(err)) {
        notify({
          message: "Upload Cancelled",
          type: "info"
        });
        setUploadProgress(0);
        controller.current = new AbortController(); // reset controller to new instance on cancel
        return;
      }
      notify({
        message: err.message,
        type: "error"
      });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }, [files, userInputData]);

  const handleDelete = useCallback(
    (file: File) => setFiles(files.filter(f => f.name !== file.name)),
    [files]
  );

  return (
    <React.Fragment>
      <Box py={5} sx={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "#0B096A",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            lineHeigh: "22px",
            fontWeight: 700
          }}
        >
          NR Accounting & Business Advisors
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#020126" }}>
          Fill out the below fields and select files to upload.
        </Typography>
        <TextInput
          autoComplete="off"
          required
          label="Name"
          name="userName"
          autoFocus
          value={userInputData.userName}
          handleChange={handleChange}
          placeholder="Enter Your name"
        />
        <TextInput
          autoComplete="off"
          required
          label="Description"
          name="description"
          multiline
          rows={3}
          value={userInputData.description}
          handleChange={handleChange}
          placeholder="Enter brief discription of what you will be uploading"
        />
      </Box>

      <Box className="container" mb={5}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 50, color: "#020126" }} />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "#020126" }}
          >
            Drag and drop files here or click to select files
          </Typography>
        </div>
      </Box>

      <Box>
        <FileList files={files} handleDelete={handleDelete} />
        <Button
          disabled={
            !files.length ||
            !userInputData.userName ||
            !userInputData.description
          }
          variant="contained"
          color="primary"
          sx={{ my: 2, mr: 2 }}
          onClick={handleClear}
        >
          {" "}
          Clear{" "}
        </Button>
        <Button
          disabled={
            !files.length ||
            !userInputData.userName ||
            !userInputData.description
          }
          variant="contained"
          color="primary"
          sx={{ my: 2, mr: 2 }}
          onClick={handleUpload}
        >
          {" "}
          Upload{" "}
        </Button>
      </Box>

      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgressWithLabel
            loading={loading}
            progress={uploadProgress}
            onCancel={uploadCancelCb}
          />
        </Backdrop>
      )}
    </React.Fragment>
  );
};

export default Home;
