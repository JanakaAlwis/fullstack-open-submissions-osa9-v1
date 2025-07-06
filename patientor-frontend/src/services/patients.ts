import axios from "axios";
import { Patient, NonSensitivePatient, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<NonSensitivePatient[]> => {
  const { data } = await axios.get<NonSensitivePatient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (newPatient: PatientFormValues): Promise<Patient> => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, newPatient);
  return data;
};

export default {
  getAll,
  getById,
  create
};


