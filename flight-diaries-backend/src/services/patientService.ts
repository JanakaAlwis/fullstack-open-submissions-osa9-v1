import patients from '../data/patients';
import { Patient } from '../types';

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getAllPatients = (): Patient[] => {
  return patients;
};

export default {
  getPatientById,
  getAllPatients
};
