export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// Entry Type Enum — used in UI dropdowns, switch statements, etc.
export enum EntryType {
  Hospital = "Hospital",
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare"
}

// Common Entry fields
interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
}

// Health Check Entry
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// Hospital Entry
export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

// Occupational Healthcare Entry
export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

// Union of all entries
export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// Patient
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

// Patient form values
export type PatientFormValues = Omit<Patient, "id" | "entries">;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

// Entry form values for adding a new entry (NO `id`)
interface BaseEntryForm {
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HospitalEntryFormValues extends BaseEntryForm {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface HealthCheckEntryFormValues extends BaseEntryForm {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntryFormValues extends BaseEntryForm {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

// Union type for all form values
export type EntryFormValues =
  | HospitalEntryFormValues
  | OccupationalHealthcareEntryFormValues
  | HealthCheckEntryFormValues;
