import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import Training4 from '../training1/Training4';
import Training from '../training1/Training4';
import Imagecompression from '../imagecompression/Imagecompression';

export default function EmployeeForm() {
  const [employees, setEmployees] = useState([]);
  const [date, setDate] = useState('');
  const [compressedImageBase64, setCompressedImageBase64] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    setDate(formattedDate); // Set the date to current date on component mount
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Add form submission logic here
    setTimeout(() => {
      console.log('Form submitted:', { date, employees, compressedImageBase64 });
      setLoading(false);
    }, 2000); // Simulate an API call
  };

  const handleEmployeesChange = (employeeDetails) => {
    setEmployees(employeeDetails);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Paper sx={{ padding: 4, width: '100%', maxWidth: 1500 }}>
        <Typography variant="h6" gutterBottom>
          Medical Checkup Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Date"
                type="date"
                value={date}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                type="date"
                value={date}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <Training onChange={handleEmployeesChange} />
            </Grid>
            <Grid item xs={12}>
              <Imagecompression setCompressedImageBase64={setCompressedImageBase64} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
