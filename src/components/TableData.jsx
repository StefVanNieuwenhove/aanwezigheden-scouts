/** @format */

import { useEffect, useState } from 'react';
import { getLedenByTak } from '../api/leden';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { lidAanwezig, lidAfwezig } from '../api/leden';

const row = [
  '#',
  'Firstname',
  'Lastname',
  'Tak',
  '# aanwezigheden',
  'Bewerking',
];

export default function TableData(tak) {
  const obj = { ...tak };
  const takName = obj.tak;
  let count;

  const [data, setData] = useState([]);
  const [aanwezig, setAanwezig] = useState(false);
  const [verwijderen, setVerwijderen] = useState(false);
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(false);
  const [aantal, setAantal] = useState(0);

  useEffect(() => {
    getLedenByTak(takName)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [takName, update]);

  const sortData = (data) => {
    const sortedData = data.sort((a, b) => {
      //return a.aanwezigheden.length <= b.aanwezigheden.length ? 1 : -1;
    });
    setData(sortedData);
    setAantal(sortedData.length);
  };

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
      <Container maxWidth="xl" sx={{ margin: 'auto' }}>
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
                        >
                          Aanwezig
                        </Button>
                        <Button
                          component="button"
                          value={lid.id}
                          variant="contained"
                          color="error"
                          onClick={(e) => openVerwijderen(e.target.value)}
                        >
                          Delete aanwezig
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
        open={aanwezig}
        onClose={closeAanwezig}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Aanwezigheid toeveogen?'}
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
}
