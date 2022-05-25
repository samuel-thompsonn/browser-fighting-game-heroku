import React, { useEffect, useRef } from 'react';
import './Canvas.css';
import Visualizer from './Visualizer';

interface CanvasProps {
  visualizers: Map<string, Visualizer>;
}

function Canvas({ visualizers }:CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) { return undefined; }
    const canvasContext = canvas.getContext('2d');
    if (canvasContext === null) { return undefined; }

    let animationFrameId:number;

    // const image = imageRef.current;
    const image = new Image();
    if (image === null) { return undefined; }
    image.onload = () => {
      // canvasContext.drawImage(image, 50, 20);
    };
    image.onerror = () => {
      // alert('no image found with that url.');
    };

    const draw = (
      canvasContextInstance: CanvasRenderingContext2D,
    ) => {
      // eslint-disable-next-line no-param-reassign
      canvasContextInstance!.fillStyle = '#000000';
      const { width } = canvasContextInstance.canvas;
      const { height } = canvasContextInstance.canvas;
      canvasContextInstance.clearRect(0, 0, width, height);
      visualizers.forEach((visualizer) => {
        visualizer.drawSelf(canvasContextInstance);
      });
    };

    const render = () => {
      draw(canvasContext);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
