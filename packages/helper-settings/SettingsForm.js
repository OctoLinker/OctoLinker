/* eslint-disable react/no-deprecated */
/* eslint-disable react/no-unused-state */

import { h, Component } from 'preact';
import linkState from 'linkstate';

import './style.css';
import { Input, Checkbox, Stats } from './components';
import * as storage from './index';

const githubTokenDescription = () => (
  <span>
    Get the most out of OctoLinker by providing a GitHub access token.
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

    if (!this.tokenInputEl) {
      this.tokenInputEl = document.querySelector('.js-token');
    }
    this.tokenInputEl.setCustomValidity('');

    if (!githubToken) {
      this.setState({
        errorMessage: undefined,
        tokenLoaded: false,
      });

      storage.save({
        githubToken: '',
      });
      return;
    }

    const response = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${githubToken}` },
    }).then((res) => res.json());

    if (!response.login) {
      this.setState({
        tokenLoaded: false,
      });

      let message = 'The token could not be validated';
      if (
        response.message &&
        response.message.toLowerCase() === 'bad credentials'
      ) {
        message = 'Your token is not valid';
      }

      this.tokenInputEl.setCustomValidity(message);
      this.tokenInputEl.reportValidity();
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

  render(props, state) {
    const { errorMessage, tokenLoaded, stats } = this.state;
    return (
      <div>
        <form
          onChange={this.onBlur.bind(this)}
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flash-success">
            {tokenLoaded && '✔ Token successfully added!'}
          </div>
          <Input
            type="password"
            name="githubToken"
            className="js-token"
            label="Access token"
            description={githubTokenDescription()}
            value={state.githubToken}
            error={errorMessage}
            onInput={(event) => {
              linkState(this, 'githubToken')(event);
              setTimeout(this.validateToken.bind(this), 100);
            }}
          />
          <p>
            For public repositories,{' '}
            <a
              href="https://github.com/settings/tokens/new?scopes=public_repo&description=OctoLinker"
              target="_blank"
              rel="noopener noreferrer"
            >
              create a token
            </a>{' '}
            with the{' '}
            <code>
              <strong>public_repo</strong>
            </code>{' '}
            permission. If you want OctoLinker for private repositories,
            you&apos;ll need to{' '}
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=OctoLinker"
              target="_blank"
              rel="noopener noreferrer"
            >
              create a token
            </a>{' '}
            with the{' '}
            <code>
              <strong>repo</strong>
            </code>{' '}
            permissions. Then copy and paste it into the input field above.
          </p>
          <p>
            <details>
              <summary>Why is a GitHub token needed?</summary>
              <p>
                OctoLinker uses the{' '}
                <a
                  href="https://developer.github.com/v3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub API
                </a>{' '}
                to retrieve repository metadata. By default, it makes
                unauthenticated requests to the GitHub API. However, there are
                two situations when requests must be authenticated:
              </p>
              <p>
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
              <p>
                When that happens, OctoLinker needs an GitHub access token in
                order to continue to work.
              </p>
            </details>
          </p>
          <hr />
          <Checkbox
            name="enablePrivateRepositories"
            label="Private repositories"
            description="Enable support for private repositories (requires a GitHub token)"
            checked={state.enablePrivateRepositories}
            onClick={linkState(this, 'enablePrivateRepositories')}
          />
        </form>
        <hr />
        <Stats counter={stats.counter} />
      </div>
    );
  }
}
