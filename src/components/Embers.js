// Glowing sparks that drift upward, like embers off a fire.
// Decorative and CSS-only. Every value comes from integer maths on the index,
// so the server and the browser render identical markup (no hydration mismatch).
// Negative delays mean the sparks are already mid-flight when the page loads.
function emberStyle(i) {
  return {
    '--x': `${(i * 37 + 11) % 97}%`,
    '--s': `${4 + ((i * 53) % 7)}px`,
    '--d': `${7 + ((i * 29) % 9)}s`,
    '--delay': `-${(i * 41) % 14}s`,
    '--drift': `${(((i * 61) % 11) - 5) * 14}px`,
  };
}

export default function Embers({ count = 18 }) {
  return (
    <div className="embers" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span className="ember" key={i} style={emberStyle(i)} />
      ))}
    </div>
  );
}
