import React from 'react';
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
} from '@coreui/react';

const Employeewisesearch = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    // Perform any search logic here if needed
    navigate('/aftersearch'); // Replace '/target-page' with the actual path you want to navigate to
  };

  return (
    <CRow className="justify-content-center" style={{ display: 'flex', justifyContent: 'center' }}>
      <CCol xs={5}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Employee Management System</strong>
          </CCardHeader>
          <CCardBody>
            <CFormFloating className="mb-3">
              <CFormInput type="text" id="floatingInput" placeholder="Enter Code" />
              <CFormLabel htmlFor="floatingInput">Enter Employee Code</CFormLabel>
            </CFormFloating>
            <CFormFloating className="mb-3">
              <CFormInput type="text" id="floatingPassword" placeholder="Enter Name" />
              <CFormLabel htmlFor="floatingPassword">Enter Your Name</CFormLabel>
            </CFormFloating>
            <div style={{ textAlign: 'center' }}>
              <CButton color="primary" shape="rounded-pill" onClick={handleSearch}>Search</CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Employeewisesearch;
