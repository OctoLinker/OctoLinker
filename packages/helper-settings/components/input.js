import { h } from 'preact';

export function Input({
  name,
  label,
  description,
  value,
  onInput,
  className,
  type = 'text',
}) {
  return (
    <p>
      <label htmlFor={name} id={name}>
        <strong>{label}</strong>
      </label>

      <input
        style={{ width: '100%' }}
        className={className}
        type={type}
        id={name}
        name={name}
        value={value}
        onInput={onInput}
      />

      <div className="note">{description}</div>
    </p>
  );
}
