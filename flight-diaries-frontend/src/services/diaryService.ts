import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const create = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, entry);
    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response) {
      throw new Error(e.response.data);
    }
    throw new Error('Unknown error');
  }
};

export default { getAll, create };
