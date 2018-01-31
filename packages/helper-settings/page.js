import { h, render, Component } from 'preact';
import linkState from 'linkstate';

import './style.css';
import { Input, Checkbox } from './components';
import * as storage from './index';

const githubTokenDescription = () => (
  <span>
    If you want better <strong>Sass, Less or Haskell support</strong> for
    private repositories, you&apos;ll need to{' '}
    <a href="https://github.com/settings/tokens/new?scopes=repo&description=OctoLinker%20browser%20extension">
      create a token
    </a>{' '}
    with the repo permissions.
  </span>
);

class App extends Component {
  async componentWillMount() {
    const store = { ...(await storage.load()) };
    this.setState(store);
  }

  componentWillUpdate(nextProps, nextState) {
    storage.save(nextState);
  }

  render(props, state) {
    return (
      <div>
        <Input
          type="password"
          name="githubToken"
          label="Access token"
          description={githubTokenDescription()}
          value={state.githubToken}
          onInput={linkState(this, 'githubToken')}
        />
        <Checkbox
          name="newWindow"
          label="New tab"
          description="Open link in a new tab."
          checked={state.newWindow}
          onClick={linkState(this, 'newWindow')}
        />
        <Checkbox
          name="newWindowActive"
          label="Focus new tab"
          description="Focus new tab when opening a link."
          checked={state.newWindowActive}
          onClick={linkState(this, 'newWindowActive')}
        />
        <Checkbox
          name="showLinkIndicator"
          label="Line indicator"
          description="Show an indicator if line contains OctoLinker links."
          checked={state.showLinkIndicator}
          onClick={linkState(this, 'showLinkIndicator')}
        />
        <Checkbox
          name="showUpdateNotification"
          label="Update notification"
          description="Show a notification if a new version is available."
          checked={state.showUpdateNotification}
          onClick={linkState(this, 'showUpdateNotification')}
        />
        <Checkbox
          name="doTrack"
          label="Usage reports"
          description="Send anonymous usage reports to Google Analytics."
          checked={state.doTrack}
          onClick={linkState(this, 'doTrack')}
        />
      </div>
    );
  }
}

render(<App />, document.body);
