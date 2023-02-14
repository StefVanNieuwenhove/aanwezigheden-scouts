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
} from '@mui/material';
import { getLedenByTak } from '../api/leden';

const row = ['Naam', 'Aanwezigheden'];

const TableData = ({ tak }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getLedenByTak(tak)
      .then((res) => {
        const value = res.sort((a, b) => {
          return a.aanwezig < b.aanwezig ? 1 : -1;
        });
        setData(value);
      })
      .catch((err) => console.log(err));
  }, [tak]);

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', textDecoration: 'underline' }}
        >
          {tak}
        </Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader={true}>
            <TableHead>
              <TableRow></TableRow>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default TableData;
