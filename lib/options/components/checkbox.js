export default ({ name, label, value, defaultValue }) => {
  const val = (value === undefined) ? defaultValue : value;

  return `<section>
    <label>
      <input type="checkbox" name="${name}" ${val ? 'checked' : ''} /> ${label}
    </label>
  </section>`;
};
