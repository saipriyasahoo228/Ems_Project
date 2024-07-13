import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Fab, Box
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Check as CheckIcon } from '@mui/icons-material';

const Training = ({ whitelevel, onChange }) => {
  const [rows, setRows] = useState([]);
  const [whitelevel_id, setWhitelevel] = useState('cttc1234');
  

  const fetchEmployeeName = async (employee_id) => {
    try {
      const response = await fetch('http://192.168.0.166:8000/employee/name/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id,whitelevel_id})
      });

      const data = await response.json();
      return data.employee_name || '';
    } catch (error) {
      console.error('Error fetching employee name:', error);
      return '';
    }
  };

  useEffect(() => {
    // Pass the employee data to the parent component whenever rows change
    onChange(rows.map(row => ({
      employee_id: row.employee_id,
      employee_name: row.employee_name,
      whitelevel_id:whitelevel_id,
    })));
  }, [rows, onChange]);

  const handleAddRow = () => {
    // Check if the last row is empty before adding a new one
    const lastRow = rows[rows.length - 1];
    if (lastRow && lastRow.employee_id.trim() === '') {
      alert('Please Fill The selected rows below..')
      return; // Do not add a new row if the last row's employee_id is blank
    }

    const updatedRows = [...rows, { employee_id: '',whitelevel_id, employee_name: '', error: false }];
    setRows(updatedRows);
  };


  

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleInputChange = async (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value.trim(); // Trim whitespace from input

    // Check for duplicates
    if (name === 'employee_id') {
      const isDuplicate = updatedRows.some((row, i) => row.employee_id === value && i !== index);
      updatedRows[index].error = isDuplicate;
    }

    setRows(updatedRows);

    // Fetch and update employee name on valid employee_id entry
    if (name === 'employee_id' && !updatedRows[index].error && value.trim() !== '') {
      const employee_name = await fetchEmployeeName(value);
      updatedRows[index].employee_name = employee_name;
      setRows(updatedRows);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TableContainer component={Paper} sx={{ border: '1px solid lightgrey', borderRadius: '8px', boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl. No</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    name="employee_id"
                    value={row.employee_id}
                    onChange={(event) => handleInputChange(index, event)}
                    fullWidth
                    error={row.error}
                    helperText={row.error ? 'Duplicate employee ID' : ''}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    name="employee_name"
                    value={row.employee_name}
                    onChange={(event) => handleInputChange(index, event)}
                    fullWidth
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteRow(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleInputChange(index)}>
                    <CheckIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddRow}
        size="small"
        sx={{
          position: 'absolute',
          bottom: -18,
          left: '49%',
          transform: 'translateX(-50%)',
          boxShadow: 'none',
          zIndex: 1
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Training;
