import axios from "axios";
import { DiaryEntry, DiaryEntryFormValues } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const create = async (newEntry: DiaryEntryFormValues): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, newEntry);
  return response.data;
};

export default { getAll, create };
