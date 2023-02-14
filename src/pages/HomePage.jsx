/** @format */

import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
} from '@mui/material';
import { getLeden } from '../api/leden';

const row = ['Naam', 'Tak', 'Aanwezigheden'];

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getLeden()
      .then((res) => {
        const value = res.sort((a, b) => {
          return a.tak < b.tak ? 1 : -1;
        });
        setData(value);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container maxWidth="xl" disableGutters>
        <TableContainer>
          <Table stickyHeader>
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
                    {lid.firstname} {lid.lastname}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default HomePage;
