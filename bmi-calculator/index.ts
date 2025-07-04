import express from 'express';
import { Request, Response } from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = bmiCalculator(heightNum, weightNum);
  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi
  });
});

// Exercise calculator POST endpoint
app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const dailyExercises = body.daily_exercises;
  const target = body.target;

  if (!Array.isArray(dailyExercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  // Check all elements in dailyExercises are numbers
  const areAllNumbers = dailyExercises.every((d: any) => !isNaN(Number(d)));

  if (!areAllNumbers) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const exercisesNumbers = dailyExercises.map((d: any) => Number(d));
  const targetNumber = Number(target);

  // Calculate the exercise results
  const periodLength = exercisesNumbers.length;
  const trainingDays = exercisesNumbers.filter(d => d > 0).length;
  const average = exercisesNumbers.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= targetNumber;

  let rating: number;
  let ratingDescription: string;

  if (average >= targetNumber) {
    rating = 3;
    ratingDescription = "great job";
  } else if (average >= targetNumber * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return res.json({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetNumber,
    average
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
