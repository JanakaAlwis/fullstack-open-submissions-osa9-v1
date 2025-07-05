import React, { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import { DiaryEntry } from "./types";

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.map((diary) => (
        <div key={diary.id} style={{ border: "1px solid gray", margin: 5, padding: 10 }}>
          <p><strong>Date:</strong> {diary.date}</p>
          <p><strong>Visibility:</strong> {diary.visibility}</p>
          <p><strong>Weather:</strong> {diary.weather}</p>
          {diary.comment && <p><strong>Comment:</strong> {diary.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default App;