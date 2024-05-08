import { Box, Button, TextField } from "@mui/material"
import { Formik } from "formik"
import * as Yup from "yup"
import { register } from "../../features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"


const AddUser = () => {
  const auth = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.user?.role !== "admin") {
      return navigate("/", { replace: true });
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "1rem 0",
        elevation: 5,
        justifyContent: "center",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
            confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(register(values) as any)
            // reset form
            values.name = ""
            values.email = ""
            values.password = ""
            values.confirmPassword = ""
            setSubmitting(false)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                margin="normal"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="warning"
                sx={{ marginTop: "1rem", marginLeft: "1rem" }}
                onClick={() => {
                  values.name = ""
                  values.email = ""
                  values.password = ""
                  values.confirmPassword = ""
                  navigate("/admin")
                }}
              >
                Cancel
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default AddUser;