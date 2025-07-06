import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { Patient, Diagnosis } from "./types";
import { apiBaseUrl } from "./constants";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>({});

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatients = async () => {
      const { data: patientList } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
      setPatients(patientList);
    };

    const fetchDiagnoses = async () => {
      const { data: diagnosisList } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      const diagnosesDict = diagnosisList.reduce<Record<string, Diagnosis>>((acc, diagnosis) => {
        acc[diagnosis.code] = diagnosis;
        return acc;
      }, {});
      setDiagnoses(diagnosesDict);
    };

    void fetchPatients();
    void fetchDiagnoses();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PatientListPage patients={patients} setPatients={setPatients} />}
        />
        <Route
          path="/patients/:id"
          element={<PatientPage diagnoses={diagnoses} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
