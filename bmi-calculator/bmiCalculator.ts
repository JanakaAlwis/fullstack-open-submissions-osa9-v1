const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
  
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi < 25) {
      return 'Normal range';
    } else if (bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };
  
  if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length !== 2 || isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
      console.error('Provide height and weight as numbers.');
      process.exit(1);
    }
  
    const [height, weight] = args.map(Number);
    console.log(calculateBmi(height, weight));
  }
  
  export default calculateBmi;
  