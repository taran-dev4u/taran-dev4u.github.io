import { useEffect } from 'react';

export const InteractiveBackground = () => {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let pointer = {
      x: 50,
      y: 50,
    };

    const commitPointer = () => {
      root.style.setProperty('--mouse-x', `${pointer.x}%`);
      root.style.setProperty('--mouse-y', `${pointer.y}%`);
      root.style.setProperty('--mouse-shift-x', `${(pointer.x - 50) / 2.7}px`);
      root.style.setProperty('--mouse-shift-y', `${(pointer.y - 50) / 2.7}px`);
      frame = 0;
    };

    const updatePointer = (event: PointerEvent) => {
      pointer = {
        x: Number(((event.clientX / window.innerWidth) * 100).toFixed(2)),
        y: Number(((event.clientY / window.innerHeight) * 100).toFixed(2)),
      };

      if (!frame) {
        frame = window.requestAnimationFrame(commitPointer);
      }
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className="interactive-background" aria-hidden="true">
      <div className="interactive-background__grid" />
      <div className="interactive-background__beam interactive-background__beam--one" />
      <div className="interactive-background__beam interactive-background__beam--two" />
    </div>
  );
};
