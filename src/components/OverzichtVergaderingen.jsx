/** @format */

import React, { useState, useEffect } from 'react';
import { getVergaderingByTak } from '../api/vergadering';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import UpdateVergadering from './UpdateVergadering';

const OverzichtVergaderingen = ({ tak }) => {
  const [vergaderingen, setVergaderingen] = useState([]);
  const [value, setValue] = useState('');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(true);
    getVergaderingByTak(tak)
      .then((data) => {
        const value = data.sort((a, b) => {
          return new Date(b.datum) - new Date(a.datum);
        });
        setVergaderingen(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tak]);

  const dateFormat = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <TableContainer
              sx={{ maxHeight: 420, color: 'green' }}
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
                    >
                      <Typography variant="h5">Vergaderingen</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <ToggleButtonGroup
                    orientation="vertical"
                    fullWidth
                    color="success"
                    value={value}
                    exclusive
                    onChange={(e, newValue) => {
                      setValue(newValue);
                      setHidden(false);
                    }}
                    sx={{ color: 'black' }}
                  >
                    {vergaderingen.map((vergadering) => (
                      <ToggleButton key={vergadering.id} value={vergadering.id}>
                        <Box>
                          <Typography variant="h6">
                            {vergadering.naam}
                          </Typography>
                          <Typography variant="p">
                            {dateFormat(vergadering.datum)}
                          </Typography>
                        </Box>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={7}>
            {hidden ? undefined : (
              <UpdateVergadering vergadering={value} tak={tak} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OverzichtVergaderingen;
