/** @format */

import React, { useState } from 'react';
import { AddForm, CsvParse } from '../components';
import { Box, Tab, AppBar } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

export default function AddPage() {
  const [tab, setTab] = useState('1');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <AppBar sx={{ mt: 8, border: '1px solid black' }}>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                centered
                textColor="inherit"
                indicatorColor="inherit"
              >
                <Tab label="Formulier" value="1" />
                <Tab label="CSV bestand" value="2" />
              </TabList>
            </AppBar>
          </Box>
          <TabPanel value={'1'}>
            <AddForm />
          </TabPanel>
          <TabPanel value={'2'}>
            <CsvParse />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
