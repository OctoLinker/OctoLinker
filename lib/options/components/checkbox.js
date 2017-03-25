export default ({ name, label, value, defaultValue, description }) => {
  const val = (value === undefined) ? defaultValue : value;
  const note = description ? `<p class="note">${description}</p>` : '';

  return `<div class="form-checkbox">
    <label>
      <input type="checkbox" name="${name}" ${val ? 'checked' : ''}>
      ${label}
    </label>${note}
  </div>`;
};
