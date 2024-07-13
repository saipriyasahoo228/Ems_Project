import React, { useState } from 'react';
import Training4 from '../training1/Training4';
import {
  Box, Typography, TextField, FormControlLabel, FormControl, Card, CardContent, Divider, Grid, Checkbox, Button, Backdrop, CircularProgress
} from '@mui/material';
import Imagecompression from '../imagecompression/Imagecompression';

const Newissuance = () => {
  const [issuedThings, setIssuedThings] = useState({
    TOOLS: false,
    PPE: false,
    DRESS: false,
  });
  const [ppeDetails, setPpeDetails] = useState([]);
  const [toolDetails, setToolDetails] = useState([]);
  const [dressDetails, setDressDetails] = useState([]);
  const [issuance_date, setDate] = useState('');
  const [issuance_id, setReferenceNumber] = useState('');
  const [white_level_id, setDropdownValue] = useState('cttc1234');
  const [compressedImageBase64, setCompressedImageBase64] = useState('');
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const handleTrainingTypeChange = (event) => {
    const { name, checked } = event.target;
    setIssuedThings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleDetailsChange = (event, type) => {
    const { name, checked } = event.target;
    const updateDetails = (details, name, checked) => {
      if (checked) {
        return [...details, { item: name }];
      } else {
        return details.filter(detail => detail.item !== name);
      }
    };

    if (type === 'TOOLS') {
      setToolDetails((prev) => updateDetails(prev, name, checked));
    }
    if (type === 'PPE') {
      setPpeDetails((prev) => updateDetails(prev, name, checked));
    }
    if (type === 'DRESS') {
      setDressDetails((prev) => updateDetails(prev, name, checked));
    }
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleEmployeesChange = (employeeDetails) => {
    setEmployees(employeeDetails);
  };

  const validateForm = () => {
    let formErrors = {};

    if (!issuance_date) formErrors.issuance_date = 'Issuance date is required';
    if (!issuance_id) formErrors.issuance_id = 'Reference number is required';
    if (issuedThings.TOOLS && toolDetails.length === 0) formErrors.tools = 'At least one tool must be selected';
    if (issuedThings.PPE && ppeDetails.length === 0) formErrors.ppe = 'At least one PPE must be selected';
    if (issuedThings.DRESS && dressDetails.length === 0) formErrors.dress = 'At least one dress must be selected';
    if (employees.length === 0) formErrors.employees = 'Employee details are required';
    if (!compressedImageBase64) formErrors.accident_image = 'Accident image is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Start loading

    const issued_things = [
      ...toolDetails.map(tool => ({ item: tool.item })),
      ...ppeDetails.map(ppe => ({ item: ppe.item })),
      ...dressDetails.map(dress => ({ item: dress.item })),
    ];

    const formData = {
      issuance: {
        issuance_id,
        issuance_date,
        white_level_id,
        accident_image: compressedImageBase64,
      },
      issued_things,
      employees: employees.map(({ employee_id, employee_name, whitelevel_id }) => ({
        employee_id,
        employee_name,
        whitelevel_id
      })),
    };

    console.log('Submitting the following data:');
    console.log(JSON.stringify(formData, null, 2));

    try {
      const response = await fetch('http://192.168.0.166:8000/item/new/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Data submitted successfully:', result);
        alert('New Issuance Successfully submitted.');
        // Optionally, you can clear the form fields here or show a success message
      } else {
        const errorData = await response.json(); // Read error response data
        console.error('Error submitting data:', errorData);
        alert(`Error submitting data: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box className="section" sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card sx={{ width: '100%', maxWidth: 1500, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2} marginBottom={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={issuance_date}
                onChange={(e) => setDate(e.target.value)}
                error={!!errors.issuance_date}
                helperText={errors.issuance_date}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Reference Number"
                fullWidth
                value={issuance_id}
                onChange={(e) => setReferenceNumber(e.target.value)}
                error={!!errors.issuance_id}
                helperText={errors.issuance_id}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: 3 }} />
          <Typography variant="h6">Items:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={issuedThings.TOOLS}
                onChange={handleTrainingTypeChange}
                name="TOOLS"
              />
            }
            label="TOOLS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={issuedThings.PPE}
                onChange={handleTrainingTypeChange}
                name="PPE"
              />
            }
            label="PPE"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={issuedThings.DRESS}
                onChange={handleTrainingTypeChange}
                name="DRESS"
              />
            }
            label="DRESS"
          />
          {issuedThings.TOOLS && (
            <Box marginBottom={3}>
              <FormControl component="fieldset">
                <Typography variant="h6">TOOLS</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toolDetails.some(tool => tool.item === '3')}
                      onChange={(e) => handleDetailsChange(e, 'TOOLS')}
                      name="3"
                      value="3"
                    />
                  }
                  label="Hammer"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toolDetails.some(tool => tool.item === '2')}
                      onChange={(e) => handleDetailsChange(e, 'TOOLS')}
                      name="2"
                      value="2"
                    />
                  }
                  label="Plier"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={toolDetails.some(tool => tool.item === '1')}
                      onChange={(e) => handleDetailsChange(e, 'TOOLS')}
                      name="1"
                      value="1"
                    />
                  }
                  label="Clamp Meter"
                />
              </FormControl>
              {errors.tools && <Typography color="error">{errors.tools}</Typography>}
            </Box>
          )}
          {issuedThings.PPE && (
            <Box marginBottom={3}>
              <FormControl component="fieldset">
                <Typography variant="h6">PPE</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ppeDetails.some(ppe => ppe.item === '4')}
                      onChange={(e) => handleDetailsChange(e, 'PPE')}
                      name="4"
                      value="4"
                    />
                  }
                  label="Helmet"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ppeDetails.some(ppe => ppe.item === '5')}
                      onChange={(e) => handleDetailsChange(e, 'PPE')}
                      name="5"
                      value="5"
                    />
                  }
                  label="Shoe"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ppeDetails.some(ppe => ppe.item === '6')}
                      onChange={(e) => handleDetailsChange(e, 'PPE')}
                      name="6"
                      value="6"
                    />
                  }
                  label="Gloves"
                />
              </FormControl>
              {errors.ppe && <Typography color="error">{errors.ppe}</Typography>}
            </Box>
          )}
          {issuedThings.DRESS && (
            <Box marginBottom={3}>
              <FormControl component="fieldset">
                <Typography variant="h6">DRESS</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dressDetails.some(dress => dress.item === '7')}
                      onChange={(e) => handleDetailsChange(e, 'DRESS')}
                      name="7"
                      value="7"
                    />
                  }
                  label="Dress"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dressDetails.some(dress => dress.item === '8')}
                      onChange={(e) => handleDetailsChange(e, 'DRESS')}
                      name="8"
                      value="8"
                    />
                  }
                  label="Jacket"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dressDetails.some(dress => dress.item === '9')}
                      onChange={(e) => handleDetailsChange(e, 'DRESS')}
                      name="9"
                      value="9"
                    />
                  }
                  label="Reflecting Jacket"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dressDetails.some(dress => dress.item === '10')}
                      onChange={(e) => handleDetailsChange(e, 'DRESS')}
                      name="10"
                      value="10"
                    />
                  }
                  label="Raincoat"
                />
              </FormControl>
              {errors.dress && <Typography color="error">{errors.dress}</Typography>}
            </Box>
          )}
          <Divider sx={{ marginBottom: 3 }} />
          <Box marginBottom={3}>
            <Typography variant="h6">EMPLOYEE DETAILS:</Typography>
            <Training4 onChange={handleEmployeesChange} />
            {errors.employees && <Typography color="error">{errors.employees}</Typography>}
          </Box>
          <Imagecompression setCompressedImageBase64={setCompressedImageBase64} />
          {errors.accident_image && <Typography color="error">{errors.accident_image}</Typography>}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </Box> 
        </CardContent>
      </Card>
    </Box>
  );
};

export default Newissuance;
