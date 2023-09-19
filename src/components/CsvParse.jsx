/** @format */

import React, { useState } from 'react';
import { Container, Button, Snackbar, Alert, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import * as Papa from 'papaparse';
import { createLid } from '../api/leden';

const CsvParse = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setFiles(e.target.files[0]);
  };

  const handleClick = () => {
    Papa.parse(files, {
      header: true,
      complete: (results) => {
        AddLid(results.data);
      },
      error: setError(true),
    });
  };

  const AddLid = async (results) => {
    await results.forEach((lid) => {
      createLid({
        voornaam: lid.Voornaam,
        familienaam: lid.Achternaam,
        tak: lid.Takken,
      });
    });
    setUpdate(true);
    setFiles([]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
    setUpdate(false);
  };

  return (
    <>
      <Container maxWidth='sm' sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant='h4'>Drop a file to upload</Typography>
        <Button
          variant='contained'
          component='label'
          sx={{
            backgroundColor: 'green',
            color: 'white',
            '&:hover': { backgroundColor: 'green' },
            mt: 1,
            width: '100%',
          }}
          endIcon={<AttachFileSharpIcon />}
        >
          Choose file
          <input hidden accept='text/csv' type='file' onChange={handleChange} />
        </Button>
        <Button
          label='Upload file'
          variant='contained'
          sx={{
            backgroundColor: 'green',
            color: 'white',
            '&:hover': { backgroundColor: 'green' },
            mt: 1,
            width: '100%',
          }}
          endIcon={<FileUploadIcon />}
          onClick={handleClick}
        >
          Upload file
        </Button>
      </Container>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        severity='success'
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          No file selected
        </Alert>
      </Snackbar>
      <Snackbar
        open={update}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        severity='success'
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          File successfully uploaded
        </Alert>
      </Snackbar>
    </>
  );
};

export default CsvParse;
