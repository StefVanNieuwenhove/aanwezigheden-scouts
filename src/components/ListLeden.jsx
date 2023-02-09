/** @format */

import React, { useState, useEffect } from 'react';
import { getLidById } from '../api/leden';
import { ListItem, ListItemText } from '@mui/material';

const ListLeden = ({ id }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getLidById(id)
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <ListItem>
        <ListItemText variant="h6">
          {data.firstname} {data.lastname}
        </ListItemText>
      </ListItem>
    </>
  );
};

export default ListLeden;
