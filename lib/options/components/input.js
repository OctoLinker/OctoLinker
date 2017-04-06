export default ({ type, name, label, value, defaultValue, description }) => {
  const val = (value === undefined) ? defaultValue : value;
  const note = description ? `<p class="note">${description}</p>` : '';

  return `<dl class="form-group">
    <dt><label>${label}</label></dt>
    <dd><input class="form-control" type="${type}" name="${name}" value="${val}">${note}</dd>
  </dl>`;
};
