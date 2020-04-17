/* eslint jsx-a11y/label-has-for: 0 */

import { h } from 'preact';

export default ({
  name,
  label,
  description,
  error,
  value,
  onInput,
  type = 'text',
}) => (
  <p>
    <label htmlFor={name} id={name}>
      <strong>{label}</strong>
    </label>

    <input
      style={{ width: '100%' }}
      className="form-control"
      type={type}
      id={name}
      name={name}
      value={value}
      onInput={onInput}
    />

    <div className="note">{description}</div>
  </p>
);
