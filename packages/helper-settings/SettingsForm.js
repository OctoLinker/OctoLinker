/* eslint-disable react/no-unused-state */

import { h, Component } from 'preact';
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

export default class Form extends Component {
  async componentWillMount() {
    this.setState({ ...(await storage.load()) });
  }

  componentWillUpdate(
    nextProps,
    { tokenLoaded, githubToken, errorMessage, ...rest },
  ) {
    storage.save(rest);
  }

  onBlur(event) {
    if (event.target.name === 'githubToken') {
      this.validateToken();
    }
  }

  async validateToken() {
    const { githubToken } = this.state;

    if (!githubToken) {
      this.setState({
        errorMessage: undefined,
        tokenLoaded: false,
      });

      storage.save({
        githubToken: undefined,
      });
      return;
    }

    const response = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${githubToken}` },
    }).then(res => res.json());

    if (!response.login) {
      this.setState({
        tokenLoaded: false,
        errorMessage: response.message || 'Something went wrong',
      });
      return;
    }

    this.setState({
      errorMessage: undefined,
      tokenLoaded: true,
    });

    storage.save({
      githubToken,
    });
  }

  tokenMessage() {
    return <div className="flash flash-success">Token successfuly added</div>;
  }

  render(props, state) {
    const { errorMessage, tokenLoaded } = this.state;

    return (
      <form
        onChange={this.onBlur.bind(this)}
        onSubmit={event => event.preventDefault()}
      >
        {tokenLoaded && this.tokenMessage()}
        <Input
          type="password"
          name="githubToken"
          label="Access token"
          description={githubTokenDescription()}
          value={state.githubToken}
          error={errorMessage}
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
      </form>
    );
  }
}
