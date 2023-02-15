/** @format */

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserAuth } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { login } = UserAuth();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors, handleReset, setErrors } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async (values) => {
        try {
          await login(values);
          navigate('/');
        } catch (error) {
          setErrors(error);
        }
      },
      validationSchema,
    });

  return (
    <>
      <Container maxWidth="sm">
        <Box>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ textDecoration: 'underline' }}
          >
            Login in
          </Typography>
          <FormControl fullWidth>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              color="success"
              variant="outlined"
              autoFocus
              margin="normal"
              error={errors?.email ? true : false}
              helperText={errors?.email}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              color="success"
              variant="outlined"
              margin="normal"
              error={errors?.password ? true : false}
              helperText={errors?.password}
              required
            />
            <Grid
              container
              directoin="row"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              paddingTop={2}
            >
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
