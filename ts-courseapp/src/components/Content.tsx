import React from "react";
import Part from "./Part";
import type { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </div>
  );
};

export default Content;
