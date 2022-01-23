import { h } from 'preact';

export function Stats({ counter }) {
  return (
    <div>
      <h2>Statistics</h2>
      Links followed: <strong>{counter}</strong>
      <span className="note pt-4">
        Your statistics are stored in your browser, we do not store them
        anywhere else.
      </span>
    </div>
  );
}
