import React from "react";
import { DiaryEntry } from "../types";

interface Props {
  diaries: DiaryEntry[];
}

const DiaryList: React.FC<Props> = ({ diaries }) => {
  return (
    <div>
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

export default DiaryList;
