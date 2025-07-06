import { Patient, Gender } from '../types';

const patients: Patient[] = [
  {
    id: '1',
    name: 'Janaka Alwis',
    ssn: '123-45-6789',
    occupation: 'Engineer',
    gender: Gender.Male,
    dateOfBirth: '1990-01-01',
    entries: []
  },
  {
    id: '2',
    name: 'Thevin Alwis',
    ssn: '350-65-4321',
    occupation: 'Teacher',
    gender: Gender.Female,
    dateOfBirth: '1985-06-15',
    entries: []
  }
];

export default patients;
