// src/components/RatioDiagram.jsx
// Visual SVG diagram for ratio comparison (Part A : Part B)

export default function RatioDiagram({ valA, valB, simpA, simpB, missing = 'none', animated = false }) {
  const isMissing = (slot) => missing === slot;
  const display = (val, slot) => isMissing(slot) ? '?' : val;
  const fillA = isMissing('valA') ? '#FFF9C4' : '#FF7043';
  const fillB = isMissing('valB') ? '#FFF9C4' : '#0EA5E9';
  const strokeA = isMissing('valA') ? '#FFB300' : '#E64A19';
  const strokeB = isMissing('valB') ? '#FFB300' : '#0284C7';

  return (
    <svg
      viewBox="0 0 280 180"
      className="ratio-diagram-svg"
      role="img"
      aria-label={`Ratio diagram comparing ${valA} to ${valB}`}
    >
      {/* Connector colon */}
      <text x="140" y="95" textAnchor="middle" fontSize="32" fontWeight="800" fill="#FFC107">:</text>

      {/* Part A Circle */}
      <circle cx="75" cy="85" r="45" fill={fillA} stroke={strokeA} strokeWidth="3.5" />
      <text x="75" y="93" textAnchor="middle" className="ratio-num">{display(valA, 'valA')}</text>
      <text x="75" y="148" textAnchor="middle" className="ratio-label">Part A</text>

      {/* Part B Circle */}
      <circle cx="205" cy="85" r="45" fill={fillB} stroke={strokeB} strokeWidth="3.5" />
      <text x="205" y="93" textAnchor="middle" className="ratio-num">{display(valB, 'valB')}</text>
      <text x="205" y="148" textAnchor="middle" className="ratio-label">Part B</text>
    </svg>
  );
}
