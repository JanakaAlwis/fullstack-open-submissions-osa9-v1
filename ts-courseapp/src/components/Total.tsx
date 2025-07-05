import React from "react";
import type { CoursePart } from "../types";

interface TotalProps {
  courseParts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  const total = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return <p><b>Number of exercises {total}</b></p>;
};

export default Total;
