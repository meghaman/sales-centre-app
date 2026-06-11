import { useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react';

type Transform = {
  scale: number;
  x: number;
  y: number;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getTouchDistance(touches: React.TouchList) {
  if (touches.length < 2) {
    return 0;
  }

  const first = touches[0];
  const second = touches[1];
  return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
}

export function usePinchZoom(resetKey: string) {
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  const gesture = useRef({
    mode: 'none' as 'none' | 'pan' | 'pinch',
    startDistance: 0,
    startScale: 1,
    startX: 0,
    startY: 0,
    startPoint: { x: 0, y: 0 },
  });

  useEffect(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
  }, [resetKey]);

  const onTouchStart = (event: ReactTouchEvent) => {
    const current = transformRef.current;

    if (event.touches.length === 2) {
      gesture.current = {
        mode: 'pinch',
        startDistance: getTouchDistance(event.touches),
        startScale: current.scale,
        startX: current.x,
        startY: current.y,
        startPoint: { x: 0, y: 0 },
      };
      return;
    }

    if (event.touches.length === 1 && current.scale > 1) {
      gesture.current = {
        mode: 'pan',
        startDistance: 0,
        startScale: current.scale,
        startX: current.x,
        startY: current.y,
        startPoint: { x: event.touches[0].clientX, y: event.touches[0].clientY },
      };
    }
  };

  const onTouchMove = (event: ReactTouchEvent) => {
    const gestureState = gesture.current;

    if (gestureState.mode === 'pinch' && event.touches.length >= 2) {
      event.preventDefault();
      const distance = getTouchDistance(event.touches);
      if (gestureState.startDistance === 0) {
        return;
      }

      const nextScale = clamp(
        gestureState.startScale * (distance / gestureState.startDistance),
        MIN_SCALE,
        MAX_SCALE,
      );

      setTransform({
        scale: nextScale,
        x: gestureState.startX,
        y: gestureState.startY,
      });
      return;
    }

    if (gestureState.mode === 'pan' && event.touches.length === 1) {
      event.preventDefault();
      const touch = event.touches[0];
      setTransform({
        scale: gestureState.startScale,
        x: gestureState.startX + (touch.clientX - gestureState.startPoint.x),
        y: gestureState.startY + (touch.clientY - gestureState.startPoint.y),
      });
    }
  };

  const onTouchEnd = () => {
    gesture.current.mode = 'none';
    setTransform((current) => {
      if (current.scale <= 1.01) {
        return { scale: 1, x: 0, y: 0 };
      }
      return current;
    });
  };

  return { transform, onTouchStart, onTouchMove, onTouchEnd };
}
