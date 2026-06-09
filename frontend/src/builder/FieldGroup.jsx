export function TextInput({ label, value, onChange, textarea = false }) {
  const Comp = textarea ? 'textarea' : 'input';
  return <label>{label}<Comp rows={textarea ? 5 : undefined} value={value || ''} onChange={(event) => onChange(event.target.value)} /></label>;
}
