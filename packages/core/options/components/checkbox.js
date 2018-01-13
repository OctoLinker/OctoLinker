import { h } from 'preact';

export default ({ name, label, description, checked, onClick }) => (
  <div className="form-checkbox">
    <label htmlFor={name}>
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onClick={onClick}
      />
      {label}
    </label>
    <p className="note">{description}</p>
  </div>
);
