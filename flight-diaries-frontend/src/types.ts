export interface DiaryEntry {
  id: number;
  date: string; // ISO date string
  visibility: "great" | "good" | "ok" | "poor";
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  comment?: string;
}
