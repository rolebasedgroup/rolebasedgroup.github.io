import React from 'react';

export default function GridOverlay(): JSX.Element {
  return (
    <div className="grid-overlay">
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          opacity: 0.05,
        }}
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" stroke="url(#gridGradient)" />
      </svg>

      {/* Animated scan line */}
      <div className="scan-line" />

      {/* Corner decorations */}
      <div className="corner-decoration corner-top-left">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M0 60 L0 0 L60 0" fill="none" stroke="#4f46e5" strokeWidth="2" opacity="0.3" />
          <circle cx="5" cy="5" r="3" fill="#4f46e5" opacity="0.5" />
        </svg>
      </div>
      <div className="corner-decoration corner-top-right">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M0 0 L60 0 L60 60" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.3" />
          <circle cx="55" cy="5" r="3" fill="#0ea5e9" opacity="0.5" />
        </svg>
      </div>
      <div className="corner-decoration corner-bottom-left">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M0 0 L0 60 L60 60" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.3" />
          <circle cx="5" cy="55" r="3" fill="#0ea5e9" opacity="0.5" />
        </svg>
      </div>
      <div className="corner-decoration corner-bottom-right">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path d="M60 0 L60 60 L0 60" fill="none" stroke="#4f46e5" strokeWidth="2" opacity="0.3" />
          <circle cx="55" cy="55" r="3" fill="#4f46e5" opacity="0.5" />
        </svg>
      </div>

      {/* Data flow lines */}
      <div className="data-flow-line data-flow-1" />
      <div className="data-flow-line data-flow-2" />
      <div className="data-flow-line data-flow-3" />
    </div>
  );
}