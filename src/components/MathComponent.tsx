import React from 'react';
import { BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';

interface MathComponentProps {
  math: string;
}

const MathComponent: React.FC<MathComponentProps> = (props: MathComponentProps) => {
  return (
    <BlockMath math={props.math} />
  );
}

export default MathComponent;
