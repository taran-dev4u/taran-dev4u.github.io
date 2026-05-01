import type { CSSProperties } from 'react';

const convCells = Array.from({ length: 9 });
const denseNodes = Array.from({ length: 7 });
const inputPlanes = Array.from({ length: 4 });

const layerStyle = (index: number) => ({ '--i': index }) as CSSProperties;

export const ProfileCNNBackdrop = () => {
  return (
    <div className="profile-cnn-backdrop" aria-hidden="true">
      <svg className="cnn-wires" viewBox="0 0 760 520" preserveAspectRatio="none">
        <defs>
          <filter id="cnn-wire-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="cnn-wire-set">
          <path d="M84 160 C168 132 202 132 286 174" />
          <path d="M84 205 C172 198 210 210 286 220" />
          <path d="M84 250 C168 282 216 284 286 266" />
          <path d="M336 164 C392 138 418 146 468 184" />
          <path d="M336 220 C390 218 424 218 468 222" />
          <path d="M336 276 C390 304 424 294 468 260" />
          <path d="M514 158 C570 128 612 142 674 190" />
          <path d="M514 220 C570 218 614 220 674 222" />
          <path d="M514 282 C570 316 614 306 674 254" />
        </g>

        <g className="cnn-pulse-set">
          <path d="M84 160 C168 132 202 132 286 174" />
          <path d="M84 205 C172 198 210 210 286 220" />
          <path d="M84 250 C168 282 216 284 286 266" />
          <path d="M336 164 C392 138 418 146 468 184" />
          <path d="M336 220 C390 218 424 218 468 222" />
          <path d="M336 276 C390 304 424 294 468 260" />
          <path d="M514 158 C570 128 612 142 674 190" />
          <path d="M514 220 C570 218 614 220 674 222" />
          <path d="M514 282 C570 316 614 306 674 254" />
        </g>
      </svg>

      <div className="cnn-label cnn-label--input">Input</div>
      <div className="cnn-label cnn-label--conv">Convolution + Pooling</div>
      <div className="cnn-label cnn-label--dense">Dense</div>
      <div className="cnn-label cnn-label--output">Profile Output</div>

      <div className="cnn-input-stack">
        {inputPlanes.map((_, index) => (
          <span key={index} style={layerStyle(index)} />
        ))}
      </div>

      <div className="cnn-block cnn-block--conv">
        {convCells.map((_, index) => (
          <span key={index} style={layerStyle(index)} />
        ))}
      </div>

      <div className="cnn-block cnn-block--pool">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} style={layerStyle(index)} />
        ))}
      </div>

      <div className="cnn-tensor">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} style={layerStyle(index)} />
        ))}
      </div>

      <div className="cnn-dense">
        <div>
          {denseNodes.map((_, index) => (
            <span key={index} style={layerStyle(index)} />
          ))}
        </div>
        <div>
          {denseNodes.slice(0, 5).map((_, index) => (
            <span key={index} style={layerStyle(index + 2)} />
          ))}
        </div>
      </div>
    </div>
  );
};
