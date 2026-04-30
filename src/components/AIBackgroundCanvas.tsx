import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

type Pulse = {
  from: number;
  to: number;
  progress: number;
  speed: number;
};

export const AIBackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let pointer = { x: -9999, y: -9999, active: false };
    let lastPulse = 0;

    const getParticleCount = () => {
      if (window.innerWidth < 640) return 42;
      if (window.innerWidth < 1024) return 72;
      return 118;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getParticleCount();
      particles = Array.from({ length: count }, (_, index) => {
        const cluster = index % 4;
        const clusterX = width * ([0.18, 0.42, 0.68, 0.86][cluster] || 0.5);
        const clusterY = height * ([0.24, 0.68, 0.34, 0.76][cluster] || 0.5);

        return {
          x: clusterX + (Math.random() - 0.5) * width * 0.35,
          y: clusterY + (Math.random() - 0.5) * height * 0.38,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          radius: Math.random() * 1.8 + 0.7,
          phase: Math.random() * Math.PI * 2,
        };
      });

      pulses = [];
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY, active: true };
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(255,255,255,0.105)' : 'rgba(15,23,42,0.105)';
      const nodeColor = isDark ? 'rgba(255,255,255,0.62)' : 'rgba(15,23,42,0.42)';
      const accent = 'rgba(251,146,60,';
      const maxDistance = width < 640 ? 105 : 145;

      const gradient = context.createRadialGradient(
        pointer.active ? pointer.x : width * 0.5,
        pointer.active ? pointer.y : height * 0.28,
        0,
        pointer.active ? pointer.x : width * 0.5,
        pointer.active ? pointer.y : height * 0.28,
        pointer.active ? 280 : 520,
      );
      gradient.addColorStop(0, `${accent}${pointer.active ? 0.26 : 0.1})`);
      gradient.addColorStop(1, 'rgba(251,146,60,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!reducedMotion) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (pointer.active && distance < 210) {
            const force = (1 - distance / 210) * 0.018;
            particle.vx -= dx * force * 0.012;
            particle.vy -= dy * force * 0.012;
          }

          particle.x += particle.vx + Math.sin(time * 0.00035 + particle.phase) * 0.06;
          particle.y += particle.vy + Math.cos(time * 0.00032 + particle.phase) * 0.06;
          particle.vx *= 0.992;
          particle.vy *= 0.992;

          if (particle.x < -40) particle.x = width + 40;
          if (particle.x > width + 40) particle.x = -40;
          if (particle.y < -40) particle.y = height + 40;
          if (particle.y > height + 40) particle.y = -40;
        }
      });

      const edges: Array<[number, number, number]> = [];
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.42;
            edges.push([i, j, opacity]);
            context.strokeStyle = lineColor.replace('0.105', opacity.toFixed(3));
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      if (!reducedMotion && time - lastPulse > 900 && edges.length > 0 && pulses.length < 8) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ from: edge[0], to: edge[1], progress: 0, speed: Math.random() * 0.008 + 0.006 });
        lastPulse = time;
      }

      pulses = pulses.filter((pulse) => pulse.progress < 1);
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        const from = particles[pulse.from];
        const to = particles[pulse.to];
        if (!from || !to) return;
        const x = from.x + (to.x - from.x) * pulse.progress;
        const y = from.y + (to.y - from.y) * pulse.progress;

        context.fillStyle = 'rgba(251,146,60,0.94)';
        context.shadowColor = 'rgba(251,146,60,0.9)';
        context.shadowBlur = 18;
        context.beginPath();
        context.arc(x, y, 2.8, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      });

      particles.forEach((particle) => {
        const glow = pointer.active ? Math.max(0, 1 - Math.hypot(pointer.x - particle.x, pointer.y - particle.y) / 220) : 0;
        context.fillStyle = glow > 0.08 ? `${accent}${0.35 + glow * 0.4})` : nodeColor;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + glow * 2.1, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
      } else {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="ai-background-canvas" aria-hidden="true" />;
};
