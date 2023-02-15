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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { getLeden, deleteLid } from '../api/leden';

const row = ['Naam', 'Tak', 'Aanwezigheden', 'delete'];

const DeletePage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    getLeden()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [action]);

  const onDeleteHandler = () => {
    deleteLid(id)
      .then((res) => {
        setAction(!action);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (e) => {
    setId(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl" disableGutters sx={{ pt: 0.5 }}>
        <TableContainer component={Paper}>
          <Table stickyHeader={true}>
            <TableHead>
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
                    {lid.voornaam} {lid.familienaam}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {lid.tak}
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
                      width: '10rem',
                      textAlign: 'center',
                      borderBottom: '1px solid black',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteForeverRoundedIcon />}
                      value={lid.id}
                      onClick={(e) => handleOpen(e.target.value)}
                    >
                      Verwijderd
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Weet je zeker dat je dit lid wilt verwijderen?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Als je dit lid verwijderd, kan je dit niet meer terugdraaien.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Annuleren
          </Button>
          <Button onClick={onDeleteHandler} variant="contained" color="warning">
            Verwijderen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePage;
