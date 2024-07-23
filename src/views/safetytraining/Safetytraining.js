import React, { useState } from 'react';
import Training2 from '../training1/Training2';
import {
  Box, Typography,  FormControl ,TextField, RadioGroup, FormControlLabel, Radio, Card, CardContent, Divider, Grid, Button, Container, CircularProgress, Alert, AlertTitle,
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
  const [about_the_training, setAbout_the_training] = useState('');
  const [errors, setErrors] = useState({
    trainingDate: '',
    trainingId: '',
    whitelevelId: '',
    trainingType: '',
    trainingName: '',
    trainers: '',
    trainees: '',
    image: '',
    about_the_training
  });

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
    setErrors({ ...errors, trainingType: selectedValue === '' ? 'Training Type is required' : '' });
  };

  const handleOtherTrainingNameChange = (event) => {
    setTraining_name(event.target.value);
  };

  const handleTrainingIdChange = (event) => {
    setTraining_id(event.target.value);
  };
  const handleTraining = (e) =>{
    setAbout_the_training(e.target.value);
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate required fields
    let formValid = true;
    const newErrors = {
      trainingDate: !training_date ? 'Training Date is required' : '',
      trainingId: !training_id ? 'Training ID is required' : '',
      whitelevelId: !whitelevel_id ? 'Whitelevel ID is required' : '',
      trainingType: !training_type ? 'Training Type is required' : '',
      trainingName: training_type === '1' && !training_name ? 'Training Name is required' : '',
      trainers: trainers.length === 0 ? 'At least one Trainer is required' : '',
      trainees: trainees.length === 0 ? 'At least one Trainee is required' : '',
      about_the_training:about_the_training.length === 0 ? ' About the training is required ':' ', 
      image: !compressedImageBase64 ? 'Image Upload is required' : '',
    };

    setErrors(newErrors);

    // Check if any field has error
    Object.values(newErrors).forEach((error) => {
      if (error) {
        formValid = false;
      }
    });

    if (!formValid) {
      setIsLoading(false);
      return;
    }

    // Prepare form data for submission
    const formData = {
      training_id,
      training_date,
      whitelevel_id,
      training_type,
      about_the_training,
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
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error in handleSubmit:', error.message);
      setErrors({ ...newErrors, form: 'Network error occurred while submitting the form. Please try again later.' });
    } finally {
      setIsLoading(false);
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
                    error={!!errors.trainingDate}
                    helperText={errors.trainingDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Reference Number"
                    fullWidth
                    value={training_id}
                    onChange={handleTrainingIdChange}
                    error={!!errors.trainingId}
                    helperText={errors.trainingId}
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
                      error={!!errors.trainingName}
                      helperText={errors.trainingName}
                    />
                  )}
                  {errors.trainingType && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.trainingType}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ marginBottom: 3 }} />
                  <Typography variant="h6">TRAINER:     ( Enter 0 in case of Others)</Typography>
                  <Training2
                    onEmployeesChange={(updatedRows) => handleInputChange('trainers', updatedRows)}
                    error={!!errors.trainers}
                    helperText={errors.trainers}
                  />
                  {errors.trainers && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.trainers}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">TRAINEE:  </Typography>
                  <Training2
                    onEmployeesChange={(updatedRows) => handleInputChange('trainees', updatedRows)}
                    error={!!errors.trainees}
                    helperText={errors.trainees}
                  />
                  {errors.trainees && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.trainees}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            label="About the Training"
                            multiline
                            rows={4}
                            value={about_the_training}
                            onChange={handleTraining}
                            error={!!errors.about_the_training}
                            helperText={errors.about_the_training}
                          />
                        </FormControl>
                  </Grid>
                <Grid item xs={12}>
                  <Imagecompression
                    compressedImageBase64={compressedImageBase64}
                    setCompressedImageBase64={setCompressedImageBase64}
                    error={!!errors.image}
                    helperText={errors.image}
                  />
                  {errors.image && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      {errors.image}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                      {isLoading ? (
                        <CircularProgress color="inherit" size={24} />
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </Box>
    </Container>
  );
};

export default Safetytraining;
