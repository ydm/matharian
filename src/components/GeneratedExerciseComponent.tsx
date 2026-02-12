import React from 'react';
import ExerciseComponent from './ExerciseComponent';
import type { Exercise } from '../exercises';
import { generateArithmeticExercise } from '../exercises';

// interface GeneratedExerciseComponentProps { }

const GeneratedExerciseComponent: React.FC = () => {
  const ex: Exercise = generateArithmeticExercise();
  return (
    <>
      <ExerciseComponent math={ex.latex} answer={ex.answer} />
    </>
  );
}

export default GeneratedExerciseComponent;
