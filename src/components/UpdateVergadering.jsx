/** @format */

import React, { useState, useEffect } from 'react';
import {
  getVergaderingById,
  updateVergaderingRemoveLid,
  updateVergaderingAddLid,
} from '../api/vergadering';
import { getLidById, getLedenByTak } from '../api/leden';
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  TableHead,
  TableBody,
  IconButton,
  Box,
  Autocomplete,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const UpdateVergadering = ({ vergadering, tak }) => {
  const [aanwezigen, setAanwezigen] = useState([]);
  const [leden, setLeden] = useState([]);
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    getVergadering(vergadering);
    getLeden(tak);
  }, [vergadering, tak, update]);

  const getVergadering = (id) => {
    getVergaderingById(id)
      .then((data) => {
        setAanwezigen(data.leden);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLeden = (tak) => {
    getLedenByTak(tak)
      .then((data) => {
        setLeden(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOverigeLeden = (aanwezigen, leden) => {
    const data = leden.filter((lid) => !aanwezigen.includes(lid.id));
    return data.map((lid) => lid.voornaam + ' ' + lid.familienaam);
  };

  const handleClick = (e, lid) => {
    e.preventDefault();
    updateVergaderingRemoveLid(vergadering, lid)
      .then((data) => {
        getVergadering(vergadering);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addLid = () => {
    const lid = leden.find(
      (lid) => lid.voornaam + ' ' + lid.familienaam === value
    );
    updateVergaderingAddLid(vergadering, lid.id)
      .then(() => getVergadering(vergadering))
      .catch((error) => console.log(error));
    setValue('');
    setUpdate(!update);
  };

  return (
    <>
      <TableContainer
        sx={{ maxHeight: 450, color: 'green' }}
        component={Paper}
        elevation={12}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: 'green',
                  color: 'white',
                  textAlign: 'center',
                  textDecoration: 'underline',
                }}
                colSpan={2}
              >
                <Typography variant="h5">Aanwezigen</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <Box sx={{ display: 'flex' }}>
                  <Autocomplete
                    value={value}
                    onChange={(e, value) => setValue(value)}
                    options={getOverigeLeden(aanwezigen, leden)}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ color: 'green' }}
                    fullWidth
                  />
                  <IconButton onClick={addLid}>
                    <PersonAddIcon color="success" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
            {aanwezigen.map((lid) => (
              <TableRow key={lid}>
                <TableCell>
                  <DisplayLid id={lid} />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <IconButton onClick={(e) => handleClick(e, lid)}>
                    <ClearIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UpdateVergadering;

const DisplayLid = ({ id }) => {
  const [lid, setLid] = useState({});

  useEffect(() => {
    getLidById(id)
      .then((data) => {
        setLid(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <Typography variant="h6">
        {lid.voornaam} {lid.familienaam}
      </Typography>
    </>
  );
};
