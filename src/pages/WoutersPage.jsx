/** @format */

import React, { useState } from 'react';
import { OverzichtVergaderingen, TableData, Vergadering } from '../components';
import { Box, Tab, AppBar } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

const WoutersPage = () => {
  const [tab, setTab] = useState('1');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <AppBar sx={{ mt: 8 }}>
              <TabList
                onChange={handleChange}
                variant="fullWidth"
                centered
                textColor="inherit"
                indicatorColor="inherit"
              >
                <Tab label="Overzicht aanwezigheden" value="1" />
                <Tab label="Vergadering toevoegen" value="2" />
                <Tab label="Overzicht vergaderingen" value="3" />
              </TabList>
            </AppBar>
          </Box>
          <TabPanel value={'1'}>
            <TableData tak={'KABOUTERS/WELPEN'} />
          </TabPanel>
          <TabPanel value={'2'}>
            <Vergadering tak={'KABOUTERS/WELPEN'} />
          </TabPanel>
          <TabPanel value={'3'}>
            <OverzichtVergaderingen tak={'KABOUTERS/WELPEN'} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default WoutersPage;
