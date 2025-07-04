const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
  
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal (healthy weight)';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  export default calculateBmi;
  
  // For CLI usage (optional)
  if (require.main === module) {
    const [_, __, heightStr, weightStr] = process.argv;
  
    if (!heightStr || !weightStr) {
      console.log('Please provide height and weight as arguments');
      process.exit(1);
    }
  
    const height = Number(heightStr);
    const weight = Number(weightStr);
  
    if (isNaN(height) || isNaN(weight)) {
      console.log('Provided values must be numbers');
      process.exit(1);
    }
  
    console.log(calculateBmi(height, weight));
  }
  