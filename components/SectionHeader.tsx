export default function SH({ title }: { title?: string }) {
  if (!title) return null;
  return (
    <div style={{ marginBottom: '1.5rem', flexShrink: 0 }}>
      <div style={{ width: 28, height: 2, background: 'var(--accent)', borderRadius: 1, marginBottom: '0.6rem' }} />
      <p style={{
        fontFamily: 'Nohemi,sans-serif', fontSize: '0.62rem', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--t3)',
      }}>
        {title}
      </p>
    </div>
  );
}
