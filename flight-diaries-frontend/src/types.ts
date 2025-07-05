export interface DiaryEntry {
  id: number;
  date: string;
  visibility: "great" | "good" | "ok" | "poor";
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  comment?: string;
}

export interface DiaryEntryFormValues {
  date: string;
  visibility: "great" | "good" | "ok" | "poor";
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  comment?: string;
}
