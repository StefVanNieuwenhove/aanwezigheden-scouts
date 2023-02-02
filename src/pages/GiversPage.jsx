/** @format */

import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { getLedenByTak, lidAanwezig, lidAfwezig } from '../api/leden';

const row = ['Naam', 'Aanwezigheden', 'Update'];

const GiversPage = () => {
  const [data, setData] = useState([]);
  const [aanwezig, setAanwezig] = useState(false);
  const [verwijderen, setVerwijderen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    getLedenByTak('GIDSEN/VERKENNERS')
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [update]);

  const openAanwezig = (e) => {
    setId(e);
    setAanwezig(true);
  };

  const closeAanwezig = () => {
    setAanwezig(false);
  };

  const openVerwijderen = (e) => {
    setId(e);
    setVerwijderen(true);
  };

  const closeVerwijderen = () => {
    setVerwijderen(false);
  };

  const isAanwezig = () => {
    lidAanwezig(id)
      .then((res) => {
        setAanwezig(false);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const nietAanwezig = async () => {
    lidAfwezig(id)
      .then((res) => {
        setVerwijderen(false);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container maxWidth="xl" disableGutters>
        <TableContainer component={Paper}>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    variant="h4"
                    sx={{ textAlign: 'center', textDecoration: 'underline' }}
                  >
                    Givers
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                {row.map((item) => (
                  <TableCell
                    key={item}
                    sx={{
                      backgroundColor: 'green',
                      color: 'white',
                      textAlign: 'center',
                      textDecoration: 'underline',
                      borderBlock: '1px solid black',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography variant="h6">{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((lid) => (
                <TableRow key={lid.id}>
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {lid.firstname} {lid.lastname}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {lid.aanwezig}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                    }}
                  >
                    <Button
                      component="button"
                      value={lid.id}
                      variant="contained"
                      color="success"
                      onClick={(e) => openAanwezig(e.target.value)}
                      size="small"
                    >
                      Aanwezig
                    </Button>
                    <Button
                      component="button"
                      value={lid.id}
                      variant="contained"
                      color="error"
                      onClick={(e) => openVerwijderen(e.target.value)}
                      size="small"
                    >
                      Delete aanwezig
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog
        open={aanwezig}
        onClose={closeAanwezig}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Aanwezigheid toevoegen?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Weet je zeker dat je de aanwezigheid wilt toevoegen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAanwezig} color="error" variant="contained">
            Niet toevoegen
          </Button>
          <Button
            onClick={() => isAanwezig()}
            autoFocus
            color="success"
            variant="contained"
          >
            Toevoegen
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={verwijderen}
        onClose={closeVerwijderen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Aanwezigheid verwijderen?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Weet je zeker dat je de aanwezigheid wilt verwijderen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeVerwijderen} color="error" variant="contained">
            Niet verwijderen
          </Button>
          <Button
            onClick={() => nietAanwezig()}
            autoFocus
            color="success"
            variant="contained"
          >
            verwijderen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GiversPage;
