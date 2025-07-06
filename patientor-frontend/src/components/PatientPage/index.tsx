import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from "../../types";
import { apiBaseUrl } from "../../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
      } catch (e) {
        setError("Patient not found");
      }
    };

    void fetchPatient();
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography>Loading patient data...</Typography>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {patient.name} {genderIcon()}
      </Typography>
      <Typography><b>Date of Birth:</b> {patient.dateOfBirth}</Typography>
      <Typography><b>SSN:</b> {patient.ssn}</Typography>
      <Typography><b>Occupation:</b> {patient.occupation}</Typography>
      <Box mt={3}>
        <Typography variant="h6">Entries</Typography>
        {patient.entries.length === 0 ? (
          <Typography>No entries found.</Typography>
        ) : (
          patient.entries.map((entry, index) => (
            <Box key={index} my={1} p={1} border={1} borderRadius={2}>
              {/* Render entry details here when you expand the Entry type */}
              <Typography>Entry details will go here.</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default PatientPage;