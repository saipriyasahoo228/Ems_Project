import React from "react";
import { CContainer, CRow, CCol } from '@coreui/react';
import Aftersearchdress from "../aftersearchdress/Aftersearchdress";
import Aftersearchppe from "../aftersearchppe/Aftersearchppe";
import Aftersearchtool from "../aftersearchtool/Aftersearchtool";
import Toolboxtraining from "../toolboxtraining/Toolboxtraining";
import Jobsafetytraining from "../jobsafetytraining/Jobsafetytraining";
import Behavioraltraining from "../behavioraltraning/Behavioraltraining";
import Othertraining from "../other/Otertraining";
import Nearmissreport from "../nearmissreport/Nearmissreport";
import Accidentreport from "../accidentreport/Accidentreport";
//import { AppHeader, AppSidebar } from "../../components";

export default function Aftersearchbody() {
  return (
    <>
      <CRow>
        <CCol className="text-center">
          <h2>ITEM-DETAILS</h2>
        </CCol>
      </CRow>
      <Aftersearchtool />
      <Aftersearchppe />
      <Aftersearchdress />
      <hr />
      <CRow>
        <CCol className="text-center">
          <h2>Safety Training Details</h2>
        </CCol>
      </CRow>
      <Toolboxtraining />
      <Jobsafetytraining />
      <Behavioraltraining />
      <Othertraining />
      <hr />
      <CRow>
        <CCol className="text-center">
          <h2>Nearmiss Report</h2>
        </CCol>
      </CRow>
      <Nearmissreport />
      <hr />
      <CRow>
        <CCol className="text-center">
          <h2>Accident Report</h2>
        </CCol>
      </CRow>
      <Accidentreport />
    </>
  );
}
