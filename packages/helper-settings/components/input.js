/* eslint jsx-a11y/label-has-for: 0 */

import { h } from 'preact';

const validationClassName = (error) => (error ? ' errored' : '');

export default ({
  name,
  label,
  description,
  error,
  value,
  onInput,
  type = 'text',
}) => (
  <dl className={`form-group${validationClassName(error)}`}>
    <dt>
      <label htmlFor={name} id={name}>
        {label}
      </label>
    </dt>
    <dd>
      <input
        style={{ width: '100%' }}
        className="form-control"
        type={type}
        id={name}
        name={name}
        value={value}
        onInput={onInput}
      />
    </dd>
    {error && <dd className="error">{error}</dd>}
    <p className="note">{description}</p>
  </dl>
);
