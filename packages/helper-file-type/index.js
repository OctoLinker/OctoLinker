import { extname, basename } from 'path';
import languages from './languages.json';

export function languageByFilePath(filepath) {
  const ext = extname(filepath) || basename(filepath);

  for (const lang in languages) {
    if (languages[lang].indexOf(ext) >= 0) {
      return lang;
    }
  }
}
