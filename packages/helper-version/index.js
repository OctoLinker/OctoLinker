import valid from 'semver/functions/valid';
import validRange from 'semver/ranges/valid';

export function isSemver(value) {
  return valid(value) || validRange(value);
}
