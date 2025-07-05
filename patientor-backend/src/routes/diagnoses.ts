import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

console.log('Diagnoses router loaded');  // To verify router is loaded

router.get('/', (_req, res) => {
  res.json(diagnosesService.getDiagnoses());
});

export default router;
