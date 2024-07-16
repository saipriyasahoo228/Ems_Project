import React, { useState } from 'react';
import Training2 from '../training1/Training2';
import {
  Box, Typography, TextField, RadioGroup, FormControlLabel, Radio, FormControl, Card, CardContent, Divider, Grid, Button, InputLabel, Select,
  MenuItem, Container, CircularProgress, Backdrop, Alert, AlertTitle,
} from '@mui/material';
import Imagecompression from '../imagecompression/Imagecompression';

const Safetytraining = () => {
  const [whitelevel_id, setWhitelevel_id] = useState('cttc1234');
  const [training_date, setTraining_date] = useState('');
  const [training_id, setTraining_id] = useState('');
  const [training_type, setTraining_type] = useState('1');
  const [training_name, setTraining_name] = useState('');
  const [showOtherTrainingField, setShowOtherTrainingField] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [compressedImageBase64, setCompressedImageBase64] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // New state for error message

  const handleInputChange = (role, updatedRows) => {
    if (role === 'trainers') setTrainers(updatedRows);
    if (role === 'trainees') setTrainees(updatedRows);
  };

  const handleWhiteLevelIdChange = (e) => {
    setWhitelevel_id(e.target.value);
  };

  const handleDateChange = (event) => {
    setTraining_date(event.target.value);
  };

  const handleTrainingTypeChange = (event) => {
    const selectedValue = event.target.value;
    setTraining_type(selectedValue);
    setShowOtherTrainingField(selectedValue === '1'); // Show field if "Others" is selected
  };

  const handleOtherTrainingNameChange = (event) => {
    setTraining_name(event.target.value);
  };

  const handleTrainingIdChange = (event) => {
    setTraining_id(event.target.value);
  };

  const resetForm = () => {
    setWhitelevel_id('cttc1234');
    setTraining_date('');
    setTraining_id('');
    setTraining_type('1');
    setTraining_name('');
    setShowOtherTrainingField(false);
    setTrainers([]);
    setTrainees([]);
    setCompressedImageBase64('');
    setIsLoading(false);
    setError('');
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted
    setError(''); // Clear any previous errors

    // Check for required fields
    if (!training_date || !training_id || !whitelevel_id || (training_type === '1' && !training_name)) {
      alert('Please fill in all required fields.');
      setIsLoading(false); // Set loading to false if validation fails
      return;
    }

    // Check for empty trainers and trainees fields
    if (trainers.length === 0 && trainees.length === 0) {
      alert('Please add at least one trainer or trainee.');
      setIsLoading(false); // Set loading to false if validation fails
      return;
    }

    // Check for duplicate entries within trainers and trainees
    const trainerIds = trainers.map(t => t.trainer_id).filter(id => id);
    const traineeIds = trainees.map(t => t.trainee_id).filter(id => id);

    const allIds = [...trainerIds, ...traineeIds];
    const duplicates = allIds.filter((item, index) => allIds.indexOf(item) !== index);

    if (duplicates.length > 0) {
      alert(`Duplicate entries found for IDs: ${duplicates.join(', ')}`);
      setIsLoading(false); // Set loading to false if validation fails
      return;
    }

    // Check for empty trainer or trainee IDs
    const invalidTrainerEntries = trainers.some(t => !t.trainer_id);
    const invalidTraineeEntries = trainees.some(t => !t.trainee_id);

    if (invalidTrainerEntries || invalidTraineeEntries) {
      alert('Please provide employee codes for all trainers and trainees.');
      setIsLoading(false); // Set loading to false if validation fails
      return;
    }

    const formData = {
      training_id,
      training_date,
      whitelevel_id,
      training_type,
      training_name: training_type === '1' ? training_name : null,
      trainers: trainers.map(({ trainer_id, whitelevel_id, trainer_name }) => ({
        trainer_id,
        whitelevel_id,
        trainer_name,
      })),
      trainees: trainees.map(({ trainee_id, trainee_name, whitelevel_id }) => ({
        trainee_id,
        whitelevel_id,
        trainee_name,
      })),
    };

    console.log('Submitting the following data:');
    console.log(JSON.stringify(formData, null, 2));

    try {
      const response = await fetch('http://192.168.0.166:8000/training/start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Capture error text from response
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error in handleSubmit:', error.message);
      setError('Network error occurred while submitting the form. Please try again later.'); // Set error message
    } finally {
      setIsLoading(false); // Set loading to false after request is completed
    }
  };

  return (
    <Container maxWidth="xl">
      <Box className="section" sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <form onSubmit={handleSubmit}>
          <Card sx={{ width: '100%', padding: 3, boxShadow: 3 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={training_date}
                    onChange={handleDateChange}
                    max={today} // Set max attribute to disable future dates
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Reference Number"
                    fullWidth
                    value={training_id}
                    onChange={handleTrainingIdChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 3 }} />
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>Training Type:</Typography>
                  <RadioGroup row value={training_type} onChange={handleTrainingTypeChange}>
                    <FormControlLabel value="4" control={<Radio />} label="Tool box Training" />
                    <FormControlLabel value="3" control={<Radio />} label="Job & Safety" />
                    <FormControlLabel value="2" control={<Radio />} label="Behavioral" />
                    <FormControlLabel value="1" control={<Radio />} label="Others" />
                  </RadioGroup>
                  {showOtherTrainingField && (
                    <TextField
                      label="Name of Training"
                      fullWidth
                      value={training_name}
                      onChange={handleOtherTrainingNameChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 3 }} />
                  <Typography variant="h6">TRAINER:</Typography>
                  <Training2 onEmployeesChange={(updatedRows) => handleInputChange('trainers', updatedRows)} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">TRAINEE:</Typography>
                  <Training2 onEmployeesChange={(updatedRows) => handleInputChange('trainees', updatedRows)} />
                </Grid>
                <Grid item xs={12}>
                  <Imagecompression marginBottom={3} setCompressedImageBase64={setCompressedImageBase64}/>
                </Grid>
                <Grid item xs={12}>
                  {error && (
                    <Alert
                      severity="error"
                      sx={{ mb: 2 }}
                      action={
                        <Button color="inherit" size="small" onClick={resetForm}>
                          OK
                        </Button>
                      }
                    >
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ ml: 2 }}>Submitting, please wait...</Typography>
      </Backdrop>
    </Container>
  );
};

export default Safetytraining;
