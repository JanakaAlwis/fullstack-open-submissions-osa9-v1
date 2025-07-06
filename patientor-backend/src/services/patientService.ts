import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import { Patient, NonSensitivePatient, Entry } from '../types/types';
import { NewPatient } from '../utils';

const allowedEntryTypes = [
  "HealthCheck",
  "OccupationalHealthcare",
  "Hospital"
];

const isValidEntryType = (entry: Entry): boolean => {
  return allowedEntryTypes.includes(entry.type);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);

  if (!patient) return undefined;

  // Validate each entry's type
  for (const entry of patient.entries) {
    if (!isValidEntryType(entry)) {
      throw new Error(`Invalid entry type: ${entry.type}`);
    }
  }

  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatientById,
  addPatient
};
