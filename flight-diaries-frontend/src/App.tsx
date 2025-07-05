import { useEffect, useState } from 'react';
import diaryService from './services/diaryService';
import { DiaryEntry, NewDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import AddDiaryEntry from './components/AddDiaryEntry';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const all = await diaryService.getAll();
      setEntries(all);
    };
    fetchDiaries();
  }, []);

  const addEntry = async (entry: NewDiaryEntry) => {
    const newEntry = await diaryService.create(entry);
    setEntries(entries.concat(newEntry));
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <AddDiaryEntry onAdd={addEntry} />
      <DiaryList entries={entries} />
    </div>
  );
};

export default App;
