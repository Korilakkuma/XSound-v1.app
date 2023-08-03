import React, { useEffect, useRef } from 'react';

export type Props = {
  width: number;
  height: number;
  hasHoverStyle: boolean;
  setElementCallback(element: HTMLCanvasElement): void;
};

export const Canvas: React.FC<Props> = (props: Props) => {
  const { width, height, hasHoverStyle, setElementCallback } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) {
      return;
    }

    setElementCallback(canvasRef.current);
  }, [canvasRef, setElementCallback]);

  return <canvas className={`Canvas${hasHoverStyle ? ' -hover' : ''}`} ref={canvasRef} width={width} height={height} />;
};
