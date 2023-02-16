/** @format */

import React, { useState, useEffect } from 'react';
import { getLedenByTak } from '../api/leden';
import { createVergadering } from '../api/vergadering';
import { UserAuth } from '../context/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  Container,
  TextField,
  Grid,
  Button,
  Box,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Checkbox,
  TableContainer,
  Paper,
  FormHelperText,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';

const Vergadering = ({ tak }) => {
  const [data, setData] = useState([]);
  /* const [vergadering, setVergadering] = useState('');
  const [datum, setDatum] = useState('');
  const [leden, setLeden] = useState([]); */
  const [open, setOpen] = useState(false);
  const { user } = UserAuth();

  const {
    values,
    errors,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      vergadering: '',
      datum: '',
      leden: [],
    },
    validationSchema: Yup.object({
      vergadering: Yup.string()
        .min(3, 'Min. lengte van 3 karakters')
        .required('Vergadering is verplicht'),
      datum: Yup.date().required('Datum is verplicht'),
      leden: Yup.array().min(1, 'Min. 1 lid selecteren'),
    }),
    onSubmit: (values) => {
      console.group(values);
      createVergadering(
        values.vergadering,
        values.leden,
        tak,
        values.datum,
        user.email
      );
      setOpen(true);
      handleReset();
    },
  });

  useEffect(() => {
    getLedenByTak(tak)
      .then((res) => {
        const data = res.sort((a, b) => {
          return a.voornaam > b.voornaam ? 1 : -1;
        });
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [tak]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="sm">
        <FormControl sx={{ mt: 5 }} fullWidth variant="outlined">
          <TextField
            name="vergadering"
            color="success"
            margin="normal"
            label="Vergadering"
            variant="outlined"
            value={values.vergadering}
            onChange={handleChange}
            autoFocus={true}
            placeholder="Vergadering 1"
            required
            fullWidth
            helperText="Min. lengte van 3 karakters"
            error={errors && errors?.vergadering ? true : false}
          />
          <TextField
            name="datum"
            color="success"
            margin="normal"
            variant="outlined"
            value={values.datum}
            onChange={handleChange}
            required
            fullWidth
            type={'date'}
            helperText="Datum van de vergadering"
            format="dd/MM/yyyy"
            error={errors && errors?.datum ? true : false}
          />
          <Box>
            <TableContainer
              sx={{ maxHeight: 420, color: 'green', mt: 2 }}
              component={Paper}
              elevation={12}
              fullWidth
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        textDecoration: 'underline',
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        textDecoration: 'underline',
                      }}
                    >
                      <Typography variant="h5">Voornaam</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        textDecoration: 'underline',
                      }}
                    >
                      <Typography variant="h5">Familienaam</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((lid) => (
                    <TableRow key={lid.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="success"
                          value={values.leden}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue('leden', [...values.leden, lid.id]);
                            } else {
                              setFieldValue(
                                'leden',
                                values.leden.filter((l) => l !== lid.id)
                              );
                            }
                          }}
                          name="leden"
                          id={lid.id}
                          checked={values.leden.includes(lid.id)}
                        />
                      </TableCell>
                      <TableCell>{lid.voornaam}</TableCell>
                      <TableCell>{lid.familienaam}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <FormHelperText>Min. 1 lid selecteren</FormHelperText>
          </Box>
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        severity="success"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Vergadering is succesvol toegvoegd
        </Alert>
      </Snackbar>
    </>
  );
};

export default Vergadering;
