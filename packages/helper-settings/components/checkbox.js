import { h } from 'preact';

export default ({ name, label, description, checked, onClick }) => (
  <p className="form-checkbox">
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={checked}
      onClick={onClick}
    />
    <span>
      <label htmlFor={name}>{label}</label>
      <br />
      <span className="note">{description}</span>
    </span>
  </p>
);
