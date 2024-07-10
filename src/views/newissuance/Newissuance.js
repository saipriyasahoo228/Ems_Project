import React, { useState } from 'react';
import Training from '../trainingcomponent/Training';
import {
  Box, Typography, TextField, FormControlLabel, FormControl, Card, CardContent, Divider, Grid, Checkbox, Button, MenuItem, Select, InputLabel
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
  // const items = [
  //   ...toolDetails.map(tool => ({ item: tool.item, item_type: 1 })),
  //   ...ppeDetails.map(ppe => ({ item: ppe.item, item_type: 2 })),
  //   ...dressDetails.map(dress => ({ item: dress.item, item_type: 3 })),
  // ];


  // const formData = {
  //   issuance_id,
  //   issuance_date,
  //   white_level_id,
  //   items,
  //   employees,
  //   accident_image: compressedImageBase64,

  // };
  // console.log(formData);

  const handleSubmit = async () => {
    const items = [
      ...toolDetails.map(tool => ({ item: tool.item, item_type: 1 })),
      ...ppeDetails.map(ppe => ({ item: ppe.item, item_type: 2 })),
      ...dressDetails.map(dress => ({ item: dress.item, item_type: 3 })),
    ];

    const formData = {
      issuance_id,
      issuance_date,
      white_level_id,
      items,
      employees,
      accident_image: compressedImageBase64,

    };
    console.log(formData);

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
        // Optionally, you can clear the form here or show a success message
        alert("New Issuance Successfully...")
      } else {
        console.error('Error submitting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Box className="section" sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
      <Card sx={{ width: '100%', maxWidth: 800, padding: 3, boxShadow: 3 }}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Reference Number"
                fullWidth
                value={issuance_id}
                onChange={(e) => setReferenceNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth margin="normal">
      <InputLabel id="white-level-id-label">White level id</InputLabel>
      <Select
        labelId="white-level-id-label"
        id="white-level-id"
        value={white_level_id}
        onChange={handleDropdownChange}
        label="White Level ID"
      >
        <MenuItem value="cttc1234">cttc1234</MenuItem>
      </Select>
    </FormControl>
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
                    />
                  }
                  label="Clamp Meter"
                />
              </FormControl>
              
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
                    />
                  }
                  label="Gloves"
                />
              </FormControl>
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
                    />
                  }
                  label="Raincoat"
                />
              </FormControl>
            </Box>
          )}
          <Divider sx={{ marginBottom: 3 }} />
          <Box marginBottom={3}>
            <Typography variant="h6">EMPLOYEE DETAILS:</Typography>
            <Training onEmployeesChange={handleEmployeesChange} />
          </Box>

          <Imagecompression setCompressedImageBase64={setCompressedImageBase64} />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </Box> 
          
        </CardContent>
      </Card>
    </Box>
  );
};

export default Newissuance;
