import React, { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import { DiaryEntry, DiaryEntryFormValues } from "./types";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";
import axios from "axios";

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(setDiaries);
  }, []);

  const addDiary = async (newEntry: DiaryEntryFormValues) => {
    try {
      const createdDiary = await diaryService.create(newEntry);
      setDiaries(diaries.concat(createdDiary));
      setErrorMessage(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error || "Failed to add diary");
      } else {
        setErrorMessage("Failed to add diary");
      }
    }
  };

  const clearError = () => setErrorMessage(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Flight Diaries</h1>
      <DiaryForm onSubmit={addDiary} errorMessage={errorMessage} clearError={clearError} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
