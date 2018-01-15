import { h } from 'preact';

export default ({
  name,
  label,
  description,
  value,
  onInput,
  type = 'text',
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        value={value}
        onInput={onInput}
      />
    </label>
    <p className="note">{description}</p>
  </div>
);
