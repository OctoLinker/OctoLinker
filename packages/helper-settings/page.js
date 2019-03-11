/* eslint-disable react/no-unused-state */

import { h, render } from 'preact';
import SettingsForm from './SettingsForm';

const App = () => (
  <div className="d-flex flex-justify-center">
    <div className="Box box-shadow four-fifth column">
      <div className="Box-row">
        <SettingsForm />
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('app'));
