import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks.ts";

interface user {
  name: string;
  email: string;
  role: string;
}

interface Props {
  initialValues: { name: string, email: string, role: string };
  onSubmit: (values: user) => void;
  onCancel: () => void;
}

const UserForm: React.FC<Props> = ({ initialValues, onSubmit, onCancel }) => {
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state: any) => state.auth.user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  useEffect(() => {
    if (user?.role !== "admin") navigate("/", { replace: true });
  }, [user]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            helperText={<ErrorMessage name="name" />}
          />
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={<ErrorMessage name="email" />}
          />
          <Field
            as={TextField}
            variant="outlined"
            margin="normal"
            select
            fullWidth
            id="role"
            label="Role"
            name="role"
            autoComplete="role"
            helperText={<ErrorMessage name="role" />}
          >
            <MenuItem value="user" >User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Field>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ marginTop: "1rem" }}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="contained"
            color="warning"
            sx={{ marginTop: "1rem", marginLeft: "1rem" }}
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;