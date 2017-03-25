import checkbox from './checkbox';
import input from './input';

export default function ({ type, ...rest }) {
  if (type === 'checkbox') {
    return checkbox(rest);
  } else if (type === 'text' || type === 'password') {
    return input({ type, ...rest });
  }
}
