interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  export const calculateExercises = (dailyHours: number[], target: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
  
    let rating = 1;
    let ratingDescription = 'you need to work much harder';
  
    if (average >= target) {
      rating = 3;
      ratingDescription = 'excellent, target met!';
    } else if (average >= target * 0.8) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };
  
  if (require.main === module) {
    const args = process.argv.slice(2).map(Number);
    const [target, ...hours] = args;
  
    if (isNaN(target) || hours.some(h => isNaN(h))) {
      console.error('Please provide numbers: target followed by daily hours.');
      process.exit(1);
    }
  
    console.log(calculateExercises(hours, target));
  }
  