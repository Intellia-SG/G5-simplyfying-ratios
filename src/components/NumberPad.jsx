import { sounds } from '../utils/audio.js';

export default function NumberPad({ value, onChange, onSubmit }) {
  const handleKey = (key) => {
    sounds.click();
    if (key === '⌫') {
      onChange(value.slice(0, -1));
    } else if (key === '✓') {
      if (value) onSubmit();
    } else {
      if (value.length < 3) onChange(value + key);
    }
  };

  const keys = ['1','2','3','4','5','6','7','8','9','⌫','0','✓'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', maxWidth: 300 }}>
      <div className="num-display">{value || '?'}</div>
      <div className="number-pad">
        {keys.map((k) => (
          <button
            key={k}
            className={`num-key${k === '⌫' ? ' del' : ''}${k === '✓' ? ' submit' : ''}`}
            onClick={() => handleKey(k)}
            aria-label={k === '⌫' ? 'delete' : k === '✓' ? 'submit' : k}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
