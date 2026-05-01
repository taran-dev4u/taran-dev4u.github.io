import { type CSSProperties, useEffect } from 'react';

const filaments = Array.from({ length: 96 }, (_, index) => ({
  x: 8 + (index % 16) * 5.55,
  z: Math.floor(index / 16) * 10,
  delay: `${(index % 16) * -0.08}s`,
}));

const pointCloud = Array.from({ length: 180 }, (_, index) => {
  const theta = index * 2.399963;
  const y = 1 - (index / 179) * 2;
  const radius = Math.sqrt(1 - y * y);
  const x = Math.cos(theta) * radius;
  const z = Math.sin(theta) * radius;

  return {
    x: 50 + x * 39,
    y: 50 + y * 39,
    z,
    size: 1.5 + ((index * 7) % 5) * 0.22,
    delay: `${(index % 29) * -0.18}s`,
    highlight: x > -0.1 && x < 0.35 && y > -0.25 && y < 0.25 && z > 0.25,
  };
});

const tensorCubes = Array.from({ length: 64 }, (_, index) => ({
  x: index % 4,
  y: Math.floor(index / 4) % 4,
  z: Math.floor(index / 16),
}));

const planeStyle = (index: number) => ({ '--i': index }) as CSSProperties;

const filamentStyle = (item: { x: number; z: number; delay: string }) => ({
  '--x': `${item.x}%`,
  '--z': `${item.z}px`,
  '--delay': item.delay,
}) as CSSProperties;

const dotStyle = (item: { x: number; y: number; z: number; size: number; delay: string }) => ({
  '--x': `${item.x}%`,
  '--y': `${item.y}%`,
  '--z': item.z,
  '--size': `${item.size}px`,
  '--delay': item.delay,
  '--opacity': Math.max(0.18, Math.min(0.78, 0.38 + item.z * 0.2)),
}) as CSSProperties;

const tensorStyle = (item: { x: number; y: number; z: number }) => ({
  '--x': item.x,
  '--y': item.y,
  '--z': item.z,
}) as CSSProperties;

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
      <div className="space-blueprint">
        <div className="space-blueprint__stars" />
        <div className="space-blueprint__camera">
          <div className="space-object space-object--transformer">
            <div className="space-object__label">Attention Head</div>
            <div className="attention-symbol">QK</div>
            <div className="attention-stack">
              {[0, 1, 2, 3].map((index) => (
                <span key={index} className="attention-plane" style={planeStyle(index)} />
              ))}
              <div className="attention-filaments">
                {filaments.map((item, index) => (
                  <i key={index} style={filamentStyle(item)} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-object space-object--agent">
            <div className="space-object__label">Agent Graph</div>
            <svg className="agent-pipes" viewBox="0 0 360 260">
              <path d="M180 128 C122 88 84 74 54 58" />
              <path d="M180 128 C248 78 292 70 320 56" />
              <path d="M180 128 C180 188 218 220 288 226" />
            </svg>
            <span className="agent-master" />
            <span className="agent-tool agent-tool--one" />
            <span className="agent-tool agent-tool--two" />
            <span className="agent-tool agent-tool--three" />
            <span className="agent-loop" />
            <span className="agent-packet agent-packet--one" />
            <span className="agent-packet agent-packet--two" />
            <span className="agent-packet agent-packet--three" />
          </div>

          <div className="space-object space-object--rag">
            <div className="space-object__label">RAG Manifold</div>
            <span className="rag-beam" />
            <div className="rag-sphere">
              {pointCloud.map((item, index) => (
                <i key={index} className={item.highlight ? 'is-highlighted' : undefined} style={dotStyle(item)} />
              ))}
            </div>
          </div>

          <div className="space-object space-object--k8s">
            <div className="space-object__label">MLOps Cluster</div>
            {[0, 1, 2].map((index) => (
              <div key={index} className={`pod-hex pod-hex--${index + 1}`}>
                <span className="pod-core" />
                <span className="pod-binary">010110101101001011</span>
              </div>
            ))}
          </div>

          <div className="space-object space-object--tensor">
            <div className="space-object__label">Latent Tensors</div>
            <div className="tensor-grid">
              {tensorCubes.map((item, index) => (
                <span key={index} style={tensorStyle(item)} />
              ))}
            </div>
          </div>

          <div className="space-object space-object--mcp">
            <div className="space-object__label">MCP Interface</div>
            <div className="mcp-ring">
              <span className="mcp-port mcp-port--globe">G</span>
              <span className="mcp-port mcp-port--database">D</span>
              <span className="mcp-port mcp-port--document">C</span>
              <span className="mcp-port mcp-port--terminal">T</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
