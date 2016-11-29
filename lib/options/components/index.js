import checkbox from './checkbox';

export default function ({ type, ...rest }) {
  if (type === 'checkbox') {
    return checkbox(rest);
  }
}
