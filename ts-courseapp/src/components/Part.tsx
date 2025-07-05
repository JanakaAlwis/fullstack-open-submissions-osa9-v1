// src/components/Part.tsx
import React from "react";
import type { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<PartProps> = ({ coursePart }) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Group projects: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <p>
            Background material:{" "}
            <a href={coursePart.backgroundMaterial} target="_blank" rel="noreferrer">
              {coursePart.backgroundMaterial}
            </a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Description: {coursePart.description}</p>
          <p>Requirements: {coursePart.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
