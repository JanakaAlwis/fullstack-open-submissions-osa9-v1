import patients from '../data/patients';
import { Patient, NonSensitivePatient } from '../types/types';
import { v1 as uuid } from 'uuid';

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

// Add new patient
const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
