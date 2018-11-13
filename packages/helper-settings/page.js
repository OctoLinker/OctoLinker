/* eslint-disable react/no-unused-state */

import { h, render } from 'preact';
import SettingsForm from './SettingsForm';

const App = () => (
  <div className="d-flex flex-justify-center p-6">
    <div className="Box box-shadow four-fifth column">
      <div className="Box-row">
        <div className="d-flex">
          <img height="54" alt="" src="icon.png" />
          <div className="pt-3 px-2">
            <h2>OctoLinker settings</h2>
          </div>
        </div>
      </div>
      <div className="Box-row">
        <SettingsForm />
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById('app'));
