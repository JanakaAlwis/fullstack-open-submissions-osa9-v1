import { useState } from 'react';
import { NewDiaryEntry, Weather, Visibility } from '../types';

const AddDiaryEntry = ({ onAdd }: { onAdd: (entry: NewDiaryEntry) => void }) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onAdd({ date, visibility, weather, comment });
      setDate('');
      setComment('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={submit}>
        <div>
          date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          visibility:
          {(['great', 'good', 'ok', 'poor'] as Visibility[]).map((v) => (
            <label key={v}>
              <input type="radio" name="visibility" value={v} checked={visibility === v} onChange={() => setVisibility(v)} /> {v}
            </label>
          ))}
        </div>
        <div>
          weather:
          {(['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as Weather[]).map((w) => (
            <label key={w}>
              <input type="radio" name="weather" value={w} checked={weather === w} onChange={() => setWeather(w)} /> {w}
            </label>
          ))}
        </div>
        <div>
          comment <input value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddDiaryEntry;
