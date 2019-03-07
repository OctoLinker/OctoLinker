/* eslint-disable react/no-unused-state */

import { h, Component } from 'preact';
import linkState from 'linkstate';

import './style.css';
import { Input, Checkbox } from './components';
import * as storage from './index';

const githubTokenDescription = () => (
  <span>
    Get the most out of OctoLinker by providing a GitHub personal access token.
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
        githubToken: null,
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
        <p className="note">
          OctoLinker uses the{' '}
          <a
            href="https://developer.github.com/v3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub API
          </a>{' '}
          to retrieve repository metadata. By default, it makes unauthenticated
          requests to the GitHub API. However, there are two situations when
          requests must be authenticated:
        </p>
        <p className="note ml-5">
          <ul>
            <li>You access a private repository</li>
            <li>
              You exceed{' '}
              <a
                href="https://developer.github.com/v3/#rate-limiting"
                target="_blank"
                rel="noopener noreferrer"
              >
                the rate limit for unauthenticated requests
              </a>
            </li>
          </ul>
        </p>
        <p className="note">
          When that happens, OctoLinker will ask for an API access token. If you
          don&apos;t already have one, create one either for all your{' '}
          <a
            href="https://github.com/settings/tokens/new?scopes=public_repo&description=OctoLinker%20browser%20extension"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>public repositories</strong>
          </a>
          {' or for '}
          <a
            href="https://github.com/settings/tokens/new?scopes=repo&description=OctoLinker%20browser%20extension"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>all public and private repositories</strong>
          </a>
          . Then copy and paste it into the input field above.
        </p>
        <hr />
        <Checkbox
          name="enablePrivateRepositories"
          label="Private repositories"
          description="Enable support for private repositories (requires a GitHub token)"
          checked={state.enablePrivateRepositories}
          onClick={linkState(this, 'enablePrivateRepositories')}
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
