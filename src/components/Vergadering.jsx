/** @format */

import React, { useState, useEffect } from 'react';
import { getLedenByTak } from '../api/leden';
import { createVergadering } from '../api/vergadering';
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
} from '@mui/material';

const Vergadering = ({ tak }) => {
  const [data, setData] = useState([]);
  const [vergadering, setVergadering] = useState('');
  const [datum, setDatum] = useState('');
  const [leden, setLeden] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getLedenByTak(tak)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [tak]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vergadering.length < 3 && leden.length === 0 && datum > Date.now())
      return;
    else {
      createVergadering(vergadering, leden, tak, datum);
      setOpen(true);
    }
    setVergadering('');
    setLeden([]);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setVergadering('');
    setLeden([]);
  };

  const handleClick = (e) => {
    const { value, checked } = e.target;
    if (checked) setLeden([...leden, value]);
  };

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
            value={vergadering}
            onChange={(e) => setVergadering(e.target.value)}
            autoFocus={true}
            placeholder="Vergadering 1"
            required
            fullWidth
            helperText="Min. lengte van 3 karakters"
          />
          <TextField
            name="datum"
            color="success"
            margin="normal"
            variant="outlined"
            value={datum}
            onChange={(e) => setDatum(e.target.value)}
            required
            fullWidth
            type={'date'}
            helperText="Datum van de vergadering"
            format="dd/MM/yyyy"
          />
          <Box>
            <TableContainer
              sx={{ maxHeight: 420, color: 'success', mt: 2 }}
              component={Paper}
              elevation={12}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox color="success" disabled />
                    </TableCell>
                    <TableCell>Voornaam</TableCell>
                    <TableCell>Achternaam</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((lid) => (
                    <TableRow key={lid.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="success"
                          value={lid.id}
                          name="leden"
                          onClick={(e) => handleClick(e)}
                          checked={leden.includes(lid.id) ? true : false}
                        />
                      </TableCell>
                      <TableCell>{lid.firstname}</TableCell>
                      <TableCell>{lid.lastname}</TableCell>
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
                disabled={vergadering.length < 3 || leden.length === 0}
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
