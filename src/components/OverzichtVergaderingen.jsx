/** @format */

import React, { useState, useEffect } from 'react';
import { getVergaderingByTak } from '../api/vergadering';
import { getLidById } from '../api/leden';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  ListItem,
  Container,
  Typography,
  Divider,
  FormHelperText,
} from '@mui/material';
import ListLeden from './ListLeden';

const OverzichtVergaderingen = ({ tak }) => {
  const [vergaderingen, setVergaderingen] = useState([]);

  useEffect(() => {
    getVergaderingByTak(tak)
      .then((data) => {
        setVergaderingen(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tak]);

  const dateFormat = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          {vergaderingen.map((vergadering) => (
            <Accordion key={vergadering.id}>
              <AccordionSummary>
                <Box>
                  <Typography variant="h6">{vergadering.naam}</Typography>
                  <FormHelperText>
                    {dateFormat(vergadering.datum)}
                  </FormHelperText>
                </Box>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <List>
                  {vergadering.leden.map((lid) => (
                    <ListLeden key={lid} id={lid} />
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default OverzichtVergaderingen;
