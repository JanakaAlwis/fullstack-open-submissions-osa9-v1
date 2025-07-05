import { DiaryEntry } from '../types';

const DiaryList = ({ entries }: { entries: DiaryEntry[] }) => (
  <div>
    <h2>Diary Entries</h2>
    {entries.map((entry) => (
      <div key={entry.id} style={{ marginBottom: '1rem' }}>
        <strong>{entry.date}</strong>
        <div>Visibility: {entry.visibility}</div>
        <div>Weather: {entry.weather}</div>
      </div>
    ))}
  </div>
);


export default DiaryList;
