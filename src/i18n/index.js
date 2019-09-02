import enLocale from './locales/en.json'
import frLocale from './locales/fr.json'

export const DEFAULT_LANGUAGE = 'en'
export const SUPPORTED_LANGUAGES = ['en', 'fr']

const availableLocales = {
  'en': enLocale,
  'fr': frLocale,
}

export const getUserLocale = () => {
  const language = (typeof navigator === 'undefined' && DEFAULT_LANGUAGE)
    || (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
  if (SUPPORTED_LANGUAGES.includes(language)) {
    return language
  }
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
  return (SUPPORTED_LANGUAGES.includes(languageWithoutRegionCode) && languageWithoutRegionCode)
    || DEFAULT_LANGUAGE
}

export const getMessages = (locale) => {
  return flattenTranslations(availableLocales[locale])
}

const flattenTranslations = translations => Object.keys(translations)
  .reduce((acc, key) => {
    if (typeof translations[key] === 'object') {
      if (Object.keys(translations[key]).length === 0) {
        return acc
      }

      const flattenObject = flattenTranslations(translations[key])
      return {
        ...acc,
        ...Object.keys(flattenObject)
          .reduce((acc2, key2) => ({
            ...acc2,
            [`${key}.${key2}`]: flattenObject[key2], // append key to beginning of flatten key
          }), {}),
      }
    }
    return {
      ...acc,
      [key]: translations[key],
    }
  }, {})
