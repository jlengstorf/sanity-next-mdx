export default function Callout({ children }) {
  return (
    <div
      style={{
        padding: '0 1rem',
        background: 'lightblue',
        border: '1px solid blue',
        borderRadius: '0.5rem',
      }}
    >
      {children}
    </div>
  );
}
