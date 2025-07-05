import React, { useState } from "react";
import { DiaryEntryFormValues } from "../types";

interface Props {
  onSubmit: (values: DiaryEntryFormValues) => void;
  errorMessage: string | null;
  clearError: () => void;
}

const visibilityOptions = ["great", "good", "ok", "poor"] as const;
const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"] as const;

const DiaryForm: React.FC<Props> = ({ onSubmit, errorMessage, clearError }) => {
  const [formValues, setFormValues] = useState<DiaryEntryFormValues>({
    date: "",
    visibility: "great",
    weather: "sunny",
    comment: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    if (errorMessage) clearError();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <div>
        <label>Date: </label>
        <input
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Visibility: </label>
        {visibilityOptions.map((option) => (
          <label key={option} style={{ marginLeft: 10 }}>
            <input
              type="radio"
              name="visibility"
              value={option}
              checked={formValues.visibility === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <label>Weather: </label>
        {weatherOptions.map((option) => (
          <label key={option} style={{ marginLeft: 10 }}>
            <input
              type="radio"
              name="weather"
              value={option}
              checked={formValues.weather === option}
              onChange={handleChange}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <label>Comment: </label>
        <textarea
          name="comment"
          value={formValues.comment}
          onChange={handleChange}
          rows={3}
          cols={30}
        />
      </div>

      {errorMessage && (
        <div style={{ color: "red", marginTop: 10 }}>{errorMessage}</div>
      )}

      <button type="submit" style={{ marginTop: 10 }}>
        Add Diary
      </button>
    </form>
  );
};

export default DiaryForm;
