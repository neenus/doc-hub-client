import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  // Link,
  // Grid,
  Box,
  Typography,
  Container,
  IconButton
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice.ts";
import useToast from "../hooks/useToast.ts";
import { useAppSelector, useAppDispatch } from "../store/hooks.ts";
import { useLocation } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const [fieldType, setFieldType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notify = useToast();
  const { user, loading } = useAppSelector((state: any) => state.auth);
  const location = useLocation();

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

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) return navigate(from, { replace: true });
  }, [user, navigate, from]);

  // Show loading while checking authentication state
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

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
                    sx={{
                      position: "absolute",
                      right: "5px",
                    }}
                    aria-label="show password"
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            {/* <Grid container>
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
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
