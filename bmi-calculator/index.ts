import express from 'express';
import { Request, Response } from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

