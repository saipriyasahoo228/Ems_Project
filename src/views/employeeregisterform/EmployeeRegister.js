import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormFloating,
  CButton,
  CRow,
  CFormSelect,
} from '@coreui/react';

const EmployeeRegister = () => {
  const navigate = useNavigate();

  // State variables for form fields and their validation
  const [whitelevel_id, setWhiteLevelId] = useState('cttc1234');
  const [employee_id, setEmployeeId] = useState('');
  const [employee_name, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('1');

  // State variables for field validation errors
  const [whiteLevelIdError, setWhiteLevelIdError] = useState('');
  const [employeeIdError, setEmployeeIdError] = useState('');
  const [employeeNameError, setEmployeeNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [addressError, setAddressError] = useState('');

  // Regular expressions for validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;
  //const addressPattern = /^[A-Za-z0-9, -]+$/;
  const addressPattern = /^[A-Za-z0-9, -]{10,}$/;


  // Event handlers for input changes
  const handleWhiteLevelIdChange = (e) => {
    setWhiteLevelId(e.target.value);
  };

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleEmployeeNameChange = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Validation functions
  const validateWhiteLevelId = () => {
    if (!whitelevel_id) {
      setWhiteLevelIdError('White Level Id is required');
      return false;
    }
    setWhiteLevelIdError('');
    return true;
  };

  const validateEmployeeId = () => {
    if (!employee_id) {
      setEmployeeIdError('Employee Id is required');
      return false;
    }
    setEmployeeIdError('');
    return true;
  };

  const validateEmployeeName = () => {
    if (!employee_name) {
      setEmployeeNameError('Employee Name is required');
      return false;
    }
    setEmployeeNameError('');
    return true;
  };

  const validateEmail = () => {
    if (email && !emailPattern.test(email)) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePhoneNumber = () => {
    if (!phonenumber) {
      setPhoneNumberError('Phone Number is required');
      return false;
    } else if (!phonePattern.test(phonenumber)) {
      setPhoneNumberError('Enter a valid 10-digit phone number');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const validateAddress = () => {
    if (address && !addressPattern.test(address)) {
      setAddressError('Enter a valid address (at least 10 characters, numbers, commas, and hyphens are allowed)');
      return false;
    }
    setAddressError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const isWhiteLevelIdValid = validateWhiteLevelId();
    const isEmployeeIdValid = validateEmployeeId();
    const isEmployeeNameValid = validateEmployeeName();
    const isEmailValid = validateEmail();
    const isPhoneNumberValid = validatePhoneNumber();
    const isAddressValid = validateAddress();

    // if (isWhiteLevelIdValid && isEmployeeIdValid && isEmployeeNameValid && isEmailValid && isPhoneNumberValid && isAddressValid) {
      let formData = {
        
        employee_id,
        employee_name,
        email,
        phonenumber,
        address,
        whitelevel_id,
        role,
      };

      console.log("formData:", formData);

      try {
        const response = await fetch('http://192.168.0.166:8000/employee/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          const errorData = await response.json(); // Parse the error response
          console.error('Response body:', errorData);
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Success:', data);
        alert('Registration successful!');
        //navigate('/login'); // Navigate to success page
      } catch (error) {
        if (error.name === 'TypeError') {
          console.error('Network error: Please check if the server is running and accessible.');
        } else {
          console.error('Error:', error);
        }
        alert(`Error: ${error.message}`);
      }
    };
  // };

  return (
    <form onSubmit={handleSubmit}>
      <CRow className="justify-content-center">
        <CCol xs={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Employee Registration Form</strong>
            </CCardHeader>
            <CCardBody>
              <CFormFloating className="mb-3">
                <CFormSelect
                  id="whiteLevelId"
                  value={whitelevel_id}
                  onChange={handleWhiteLevelIdChange}
                  onBlur={validateWhiteLevelId}
                  invalid={!!whiteLevelIdError}
                >
                  <option value="cttc1234">cttc1234</option>
                </CFormSelect>
                <CFormLabel htmlFor="whiteLevelId">Company Registration Number</CFormLabel>
                <div className="invalid-feedback">{whiteLevelIdError}</div>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="employeeId"
                  placeholder="Enter Employee Id"
                  value={employee_id}
                  onChange={handleEmployeeIdChange}
                  onBlur={validateEmployeeId}
                  invalid={!!employeeIdError}
                />
                <CFormLabel htmlFor="employeeId">Enter Employee Id</CFormLabel>
                <div className="invalid-feedback">{employeeIdError}</div>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="employeeName"
                  placeholder="Enter Employee Name"
                  value={employee_name}
                  onChange={handleEmployeeNameChange}
                  onBlur={validateEmployeeName}
                  invalid={!!employeeNameError}
                />
                <CFormLabel htmlFor="employeeName">Enter Employee Name</CFormLabel>
                <div className="invalid-feedback">{employeeNameError}</div>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="employeeEmail"
                  placeholder="Enter Employee Email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateEmail}
                  invalid={!!emailError}
                />
                <CFormLabel htmlFor="employeeEmail">Enter Employee Email</CFormLabel>
                <div className="invalid-feedback">{emailError}</div>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <CFormInput
                  type="text"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  value={phonenumber}
                  onChange={handlePhoneNumberChange}
                  onBlur={validatePhoneNumber}
                  invalid={!!phoneNumberError}
                />
                <CFormLabel htmlFor="phoneNumber">Enter Phone Number</CFormLabel>
                <div className="invalid-feedback">{phoneNumberError}</div>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <textarea
                  className={`form-control ${addressError ? 'is-invalid' : ''}`}
                  id="address"
                  placeholder="Enter Address"
                  style={{ height: '100px' }}
                  value={address}
                  onChange={handleAddressChange}
                  onBlur={validateAddress}
                />
                {addressError && <div className="invalid-feedback">{addressError}</div>}
                <CFormLabel htmlFor="address">Enter Address</CFormLabel>
              </CFormFloating>
              <CFormFloating className="mb-3">
                <CFormSelect
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="1">Employee</option>
                  <option value="2">Supervisor</option>
                </CFormSelect>
                <CFormLabel htmlFor="role">Select Role</CFormLabel>
              </CFormFloating>
              <div style={{ textAlign: 'center' }}>
                <CButton type="submit" color="primary" shape="rounded-pill">
                  Submit
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </form>
  );
};

export default EmployeeRegister;
