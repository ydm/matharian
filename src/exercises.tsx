export type Exercise = {
  latex: string;
  answer: number;
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOperator(): "+" | "-" | "*" | "/" {
  const ops: Array<"+" | "-" | "*" | "/"> = ["+", "-", "*", "/"];
  return ops[randomInt(0, ops.length - 1)];
}

function toLatexOperator(op: string): string {
  if (op === "*") return "\\times";
  if (op === "/") return "\\div";
  return op;
}

export function generateArithmeticExercise(): Exercise {
  const maxOperations = 5;
  const operationsCount = randomInt(1, maxOperations);

  let currentValue = randomInt(1, 10000);
  let expression = currentValue.toString();

  for (let i = 0; i < operationsCount; i++) {
    const op = randomOperator();
    const nextValue = randomInt(1, 10000);

    if (op === "+") {
      currentValue += nextValue;
      expression = `(${expression} ${toLatexOperator(op)} ${nextValue})`;
    }

    else if (op === "-") {
      currentValue -= nextValue;
      expression = `(${expression} ${toLatexOperator(op)} ${nextValue})`;
    }

    else if (op === "*") {
      currentValue *= nextValue;
      expression = `(${expression} ${toLatexOperator(op)} ${nextValue})`;
    }

    else if (op === "/") {
      // Ensure exact division
      if (currentValue === 0) {
        continue; // skip division if zero
      }

      // Choose a divisor of currentValue
      const divisors: number[] = [];
      for (let d = 1; d * d <= Math.abs(currentValue); d++) {
        if (currentValue % d === 0) {
          divisors.push(d);
          if (d !== Math.abs(currentValue) / d) {
            divisors.push(Math.abs(currentValue) / d);
          }
        }
      }

      if (divisors.length === 0) {
        continue; // fallback if something weird happens
      }

      const divisor = divisors[randomInt(0, divisors.length - 1)];

      currentValue = currentValue / divisor;
      expression = `(${expression} ${toLatexOperator(op)} ${divisor})`;
    }

    // Prevent runaway growth
    if (Math.abs(currentValue) > 1000000000) {
      break;
    }
  }

  expression = expression.substring(1, expression.length - 1); // remove outer parentheses

  return {
    latex: expression,
    answer: currentValue
  };
}
