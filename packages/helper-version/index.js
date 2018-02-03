import semver from 'semver';

export function isSemver(value) {
  return semver.valid(value) || semver.validRange(value);
}
