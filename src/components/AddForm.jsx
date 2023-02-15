/** @format */

import React, { useState } from 'react';
import { createLid } from '../api/leden';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Container,
  FormControl,
  Grid,
  Snackbar,
  Alert,
  Autocomplete,
} from '@mui/material';

const takken = ['kapoen', 'wouter', 'jonggiver', 'giver', 'jin'];
const validationSchema = Yup.object({
  voornaam: Yup.string().required('Voornaam is verplicht in te vullen'),
  familienaam: Yup.string().required('familienaam is verplicht in te vullen'),
  tak: Yup.string().required('Tak is verplicht').isType(takken),
});

const AddForm = () => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(true);

  const { values, handleChange, handleSubmit, errors, handleReset } = useFormik(
    {
      initialValues: {
        voornaam: '',
        familienaam: '',
        tak: 'kapoen',
      },
      onSubmit: (values) => {
        setOpen(true);
        createLid(values);
        setFocus(true);
        handleReset();
      },
      validationSchema,
    }
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ marginTop: '2rem' }}>
        <Container maxWidth="sm">
          <FormControl sx={{ padding: '1rem' }} fullWidth variant="outlined">
            <TextField
              name="voornaam"
              color="success"
              label="Voornaam"
              margin="normal"
              onChange={handleChange}
              required
              variant="outlined"
              value={values.voornaam}
              autoFocus={focus}
              error={errors && errors?.voornaam ? true : false}
              helperText={errors?.voornaam}
            />
            <TextField
              name="familienaam"
              color="success"
              label="Familienaam"
              margin="normal"
              onChange={handleChange}
              required
              variant="outlined"
              value={values.familienaam}
              error={errors && errors?.familienaam ? true : false}
              helperText={errors?.familienaam}
            />
            <Autocomplete
              name="tak"
              color="success"
              required
              id="tak"
              disablePortal
              onChange={(e, value) => {
                handleChange({ target: { name: 'tak', value } });
              }}
              options={takken}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="tak"
                  color="success"
                  margin="dense"
                  value={values.tak}
                  onChange={handleChange}
                  error={errors && errors?.tak ? true : false}
                  helperText={errors?.tak}
                />
              )}
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
                  Voeg toe
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Container>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        severity="success"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Lid is succesvol toegvoegd
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddForm;
