import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";
import { Patient, NonSensitivePatient } from "./types";
import { apiBaseUrl } from "./constants";

const App = () => {
  const [patients, setPatients] = useState<NonSensitivePatient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatients = async () => {
      const { data: patientList } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
      const nonSensitivePatients = patientList.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
      }));
      setPatients(nonSensitivePatients);
    };

    void fetchPatients();
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
          element={<PatientPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
