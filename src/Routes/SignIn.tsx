import { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice.ts";
import useToast from "../hooks/useToast.ts";

const theme = createTheme();

export default function SignIn() {
  const [fieldType, setFieldType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const notify = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const body = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    if (!body.email || !body.password) {
      notify({
        message: "Please enter email and password",
        type: "error"
      });
      return;
    }
    {
      const response = await dispatch(login(body));

      if (response.type === "auth/login/fulfilled" && response.payload.user) {
        notify({
          message: `Welcome ${response.payload.user.name}!`,
          type: "success"
        });
        navigate("/", { replace: true });
      } else {
        notify({
          message: "Invalid credentials",
          type: "error"
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={fieldType}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      setFieldType(
                        fieldType === "password" ? "text" : "password"
                      )
                    }
                  >
                    <RemoveRedEyeIcon color="primary" />
                  </IconButton>
                )
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
