import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Entry, Diagnosis, Gender } from "../../types";
import { apiBaseUrl } from "../../constants";

import EntryDetails from "../EntryDetails";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, Diagnosis>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(data);
      } catch {
        setError("Patient not found");
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        const diagnosesDict = data.reduce<Record<string, Diagnosis>>((acc, diagnosis) => {
          acc[diagnosis.code] = diagnosis;
          return acc;
        }, {});
        setDiagnoses(diagnosesDict);
      } catch {
        setError("Failed to load diagnoses");
      }
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography>Loading patient data...</Typography>;
  }

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {patient.name} {genderIcon(patient.gender)}
      </Typography>
      <Typography><b>Date of Birth:</b> {patient.dateOfBirth}</Typography>
      <Typography><b>SSN:</b> {patient.ssn}</Typography>
      <Typography><b>Occupation:</b> {patient.occupation}</Typography>

      <Box mt={3}>
        <Typography variant="h6">Entries</Typography>
        {patient.entries.length === 0 ? (
          <Typography>No entries found.</Typography>
        ) : (
          patient.entries.map((entry: Entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default PatientPage;

