import React, { useState } from 'react';
import {
  Container,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Backdrop
} from '@mui/material';
import Imagecompression from '../imagecompression/Imagecompression';
import Training1 from '../training1/Training1';

const Accident = () => {
  const [whitelevel, setWhitelevel] = useState('cttc1234');
  const [accident_type, setAccidentType] = useState('');
  const [toolbox_train, setToolboxTrain] = useState('false');
  const [toolbox_reference_number, setToolboxReferenceNumber] = useState('');
  const [accident_report_date, setAccidentReportDate] = useState('');
  const [accident_id, setAccidentId] = useState('');
  const [severity, setSeverity] = useState('');
  const [permit_status, setPermitStatus] = useState('');
  const [ppe_status, setPpeStatus] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [workmen, setWorkmen] = useState([]);
  const [reported_by, setReportedBy] = useState([]);
  const [about_the_accident, setAboutTheAccident] = useState('');
  const [compressedImageBase64, setCompressedImageBase64] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReport = (e) => {
    setAboutTheAccident(e.target.value);
  };

  const handleInputChange = (role, updatedRows) => {
    if (role === 'supervisors') setSupervisors(updatedRows);
    if (role === 'workmen') setWorkmen(updatedRows);
    if (role === 'reported_by') setReportedBy(updatedRows);
  };

  const handleReportTypeChange = (event) => {
    setAccidentType(event.target.value);
  };

  const handleToolBoxTalkChange = (event) => {
    setToolboxTrain(event.target.value);
  };

  const handleDateChange = (event) => {
    setAccidentReportDate(event.target.value);
  };

  const handleReferenceNumberChange = (event) => {
    setAccidentId(event.target.value);
  };

  const handleSeverityChange = (event) => {
    setSeverity(event.target.value);
  };

  const handlePermitStatusChange = (event) => {
    setPermitStatus(event.target.value);
  };

  const handlePpeStatusChange = (event) => {
    setPpeStatus(event.target.value);
  };

  const handleReference = (event) => {
    setToolboxReferenceNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = {
      accident_reporting_date: accident_report_date,
      accident_id,
      accident_type: parseInt(accident_type, 10),
      severity: parseInt(severity, 10),
      permit_status: parseInt(permit_status, 10),
      ppe_status: parseInt(ppe_status, 10),
      toolbox_train: toolbox_train === 'true',
      toolbox_reference_number,
      accident_image: compressedImageBase64,
      about_the_accident,
      whitelevel,
      reported_by: reported_by.map(({ employee, employee_name, whitelevel_id }) => ({
        employee,
        employee_name,
        whitelevel_id
      })),
      workmen: workmen.map(({ employee, employee_name, whitelevel_id }) => ({
        employee,
        employee_name,
        whitelevel_id
      })),
      supervisors: supervisors.map(({ employee, employee_name, whitelevel_id }) => ({
        employee,
        employee_name,
        whitelevel_id
      })),
    };

    console.log('Submitting the following data:');
    console.log(JSON.stringify(formData, null, 2));

    try {
      const response = await fetch('http://192.168.0.166:8000/accident/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`HTTP error! Status: ${response.status}. ${errorData.message}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);

      // Show success alert
      window.alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error in handleSubmit:', error.message);

      // Show error alert
      window.alert('Error submitting form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box className="section" sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <form onSubmit={handleSubmit}>
          <Card sx={{ width: '100%', maxWidth: 1500, padding: 3, boxShadow: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={accident_report_date}
                    onChange={handleDateChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Reference Number"
                    fullWidth
                    onChange={handleReferenceNumberChange}
                    value={accident_id}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ marginY: 3 }} />
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Incident Type</FormLabel>
                <RadioGroup row value={accident_type} onChange={handleReportTypeChange}>
                  <FormControlLabel value="2" control={<Radio />} label="Accident" />
                  <FormControlLabel value="1" control={<Radio />} label="Near Miss" />
                </RadioGroup>
              </FormControl>

              {accident_type && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Reported By:</Typography>
                    <Training1 onEmployeesChange={(updatedRows) => handleInputChange('reported_by', updatedRows)} initialWhitelevelId={whitelevel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Workmen Involved:</Typography>
                    <Training1 onEmployeesChange={(updatedRows) => handleInputChange('workmen', updatedRows)} initialWhitelevelId={whitelevel} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography gutterBottom>Supervisor:</Typography>
                    <Training1 onEmployeesChange={(updatedRows) => handleInputChange('supervisors', updatedRows)} initialWhitelevelId={whitelevel} />
                  </Grid>

                  {accident_type === '2' && (
                    <>
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Type Of Accident</FormLabel>
                          <RadioGroup row value={severity} onChange={handleSeverityChange}>
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Permit Status</FormLabel>
                          <RadioGroup row value={permit_status} onChange={handlePermitStatusChange}>
                            <FormControlLabel value="4" control={<Radio />} label="Valid" />
                            <FormControlLabel value="3" control={<Radio />} label="Not Required" />
                            <FormControlLabel value="2" control={<Radio />} label="No Permit" />
                            <FormControlLabel value="1" control={<Radio />} label="Expired" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">PPE Status</FormLabel>
                          <RadioGroup row value={ppe_status} onChange={handlePpeStatusChange}>
                            <FormControlLabel value="2" control={<Radio />} label="OK" />
                            <FormControlLabel value="1" control={<Radio />} label="Faulty" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Tool Box Talk</FormLabel>
                          <RadioGroup row value={toolbox_train} onChange={handleToolBoxTalkChange}>
                            <FormControlLabel value="true" control={<Radio />} label="Yes" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                        {toolbox_train === 'true' && (
                          <TextField
                            label="ToolBox Reference Number"
                            fullWidth
                            onChange={handleReference}
                            value={toolbox_reference_number}
                            sx={{ marginTop: 2 }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            label="About the Accident"
                            multiline
                            rows={4}
                            value={about_the_accident}
                            onChange={handleReport}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Imagecompression setCompressedImageBase64={setCompressedImageBase64}/>
                      </Grid>
                    </>
                  )}
                </Grid>
              )}
             <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </Box> 
            </CardContent>
          </Card>
        </form>
      </Box>

      <Backdrop open={isLoading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Accident;
