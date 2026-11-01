export const LANGUAGES = [
  { name: 'Catalan', code: 'ca' },
  { name: 'Czech', code: 'cs' },
  { name: 'German', code: 'de' },
  { name: 'Estonian', code: 'et' },
  { name: 'French', code: 'fr' },
  { name: 'Hungarian', code: 'hu' },
  { name: 'Croatian', code: 'hr' },
  { name: 'Italian', code: 'it' },
  { name: 'Polish', code: 'pl' },
  { name: 'Russian', code: 'ru' },
  { name: 'Slovak', code: 'sk' },
  { name: 'Swedish', code: 'sv' },
];

export const LANGUAGE_NAMES = LANGUAGES.map((language) => language.name);

export function languageNamesToCodes(names) {
  return names
    .map((name) => LANGUAGES.find((language) => language.name === name)?.code)
    .filter(Boolean);
}
