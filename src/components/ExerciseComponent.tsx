import React, { useRef, useState } from 'react';
import MathComponent from './MathComponent';
import styles from './ExerciseComponent.module.css';

interface ExerciseComponentProps {
  question?: string;
  math: string;
  answer: number;
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = (props: ExerciseComponentProps) => {
  const inputRef: React.RefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
  const resultRef: React.RefObject<HTMLHeadingElement | null> = useRef<HTMLHeadingElement>(null);
  const [isCorrect, setIsCorrect]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);

  function check() {
    const value: number = parseInt(inputRef.current?.value.trim() || "0", 10);
    const correct = value == props.answer;
    setIsCorrect(correct);
    console.log("VALUE", value, props.answer, correct);
    if (resultRef.current) {
      resultRef.current.textContent = correct ? "ПРАВИЛНО, БРАВО!" : "Грешно, 10 лицеви!";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      check();
    }
  }

  return (
    <>
      <div>
        <p>{props.question ?? "Пресметни"}:</p>
        <hr />
        <MathComponent math={props.math} />
        <hr />
        <br />
        <input ref={inputRef} className={styles.answer} type="text" placeholder="Напиши отговора си тук" onKeyDown={handleKeyDown} />
        <br />
        <br />
        <button onClick={check}>Провери</button>
        <br />
        <h2 ref={resultRef}></h2>
        {isCorrect && <a href="/">Зареди нова задача</a>}
      </div>
    </>
  );
}

export default ExerciseComponent;
