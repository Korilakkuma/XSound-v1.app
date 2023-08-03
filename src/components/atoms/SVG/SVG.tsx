import React, { useEffect, useRef } from 'react';

export type Props = {
  width: number;
  height: number;
  hasHoverStyle: boolean;
  setElementCallback(element: SVGSVGElement): void;
};

export const SVG: React.FC<Props> = (props: Props) => {
  const { width, height, hasHoverStyle, setElementCallback } = props;

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current === null) {
      return;
    }

    setElementCallback(svgRef.current);
  }, [svgRef, setElementCallback]);

  return <svg className={`SVG${hasHoverStyle ? ' -hover' : ''}`} ref={svgRef} width={width} height={height} />;
};
