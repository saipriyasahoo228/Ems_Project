import React, { useState } from 'react';
import Training1 from '../training1/Training1';
import {
  Box, Typography, TextField, RadioGroup, FormControlLabel, Radio, FormControl, Card, CardContent, Divider, Grid, Button, InputLabel, Select,
  MenuItem,
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

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for duplicate entries within trainers and trainees
    const allIds = [...trainers.map(t => t.trainer_id), ...trainees.map(t => t.trainee_id)];
    const duplicates = allIds.filter((item, index) => allIds.indexOf(item) !== index);

    if (duplicates.length > 0) {
      alert(`Duplicate entries found for IDs: ${duplicates.join(', ')} in trainee field.`);
      return;
    }

    const formData = {
      training_id,
      training_date,
      whitelevel_id,
      training_type,
      training_name: training_type === '1' ? training_name : null,
      trainers: trainers.map(({ trainer_id, trainer_name }) => ({
        trainer_id,
        trainer_name,
      })),
      trainees: trainees.map(({ trainee_id, trainee_name }) => ({
        trainee_id,
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
    }
  };

  return (
    <Box className="section" sx={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: '100%', maxWidth: 1000, padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Grid container spacing={2} marginBottom={3}>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Reference Number"
                  fullWidth
                  value={training_id}
                  onChange={handleTrainingIdChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id="whiteLevelIdLabel">Company Registration Number</InputLabel>
                  <Select
                    labelId="whiteLevelIdLabel"
                    id="whiteLevelId"
                    value={whitelevel_id}
                    label="Company Registration Number"
                    onChange={handleWhiteLevelIdChange}
                  >
                    <MenuItem value="cttc1234">cttc1234</MenuItem>
                    {/* <MenuItem value="other1">other1</MenuItem>
                    <MenuItem value="other2">other2</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: 3 }} />
            <Box className="section3" marginBottom={3}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>Training Type:</Typography>
              <FormControl component="fieldset">
                <RadioGroup row value={training_type} onChange={handleTrainingTypeChange}>
                  <FormControlLabel value="4" control={<Radio />} label="Tool box Training" />
                  <FormControlLabel value="3" control={<Radio />} label="Job & Safety" />
                  <FormControlLabel value="2" control={<Radio />} label="Behavioral" />
                  <FormControlLabel value="1" control={<Radio />} label="Others" />
                </RadioGroup>
              </FormControl>
            </Box>
            {showOtherTrainingField && (
              <Box marginBottom={3}>
                <TextField
                  label="Name of Training"
                  fullWidth
                  value={training_name}
                  onChange={handleOtherTrainingNameChange}
                />
              </Box>
            )}
            <Divider sx={{ marginBottom: 3 }} />
            <Box marginBottom={3}>
              <Typography variant="h6">TRAINER:</Typography>
              
              <Training1  onEmployeesChange={(updatedRows) => handleInputChange('trainers', updatedRows)} />
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h6">TRAINEE:</Typography>
              <Training1  onEmployeesChange={(updatedRows) => handleInputChange('trainees', updatedRows)} />
             
            </Box>

            <Imagecompression marginBottom={3} />

            <Box>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default Safetytraining;
