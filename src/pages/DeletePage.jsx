/** @format */

import { useEffect, useState } from 'react';
import { deleteLid, getLeden } from '../api/leden';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

let count;

const row = ['#', 'Firstname', 'Lastname', 'Tak', '# aanwezigheden', 'Delete'];

export default function DeletePage() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    getLeden()
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const onDeleteHandler = () => {
    deleteLid(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (e) => {
    setId(e);
    console.log(e);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="xl">
        <TableContainer component={Paper} sx={{ marginLeft: '1.5rem' }}>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow>
                {row.map((item) => (
                  <TableCell
                    key={item}
                    sx={{
                      bgcolor: 'success.light',
                      width: '5rem',
                      textAlign: 'center',
                      textDecoration: 'underline',
                      borderBlock: '1px solid black',
                      fontWeight: 'bold',
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(
                (lid, id) => (
                  (count = id + 1),
                  (
                    <TableRow key={lid.id}>
                      <TableCell
                        sx={{
                          width: '5rem',
                          textAlign: 'center',
                          borderBottom: '1px solid black',
                        }}
                      >
                        {count}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: '10rem',
                          textAlign: 'center',
                          borderBottom: '1px solid black',
                        }}
                      >
                        {lid.firstname}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: '10rem',
                          textAlign: 'center',
                          borderBottom: '1px solid black',
                        }}
                      >
                        {lid.lastname}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: '10rem',
                          textAlign: 'center',
                          borderBottom: '1px solid black',
                        }}
                      >
                        {lid.tak}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: '10rem',
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
                  )
                )
              )}
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
}
