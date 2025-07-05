import patients from '../data/patients';
import { Patient, NonSensitivePatient } from '../types/types';

// Return all patients (including ssn)
const getPatients = (): Patient[] => {
  return patients;
};

// Return patients excluding ssn field
const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getNonSensitivePatients,
};
