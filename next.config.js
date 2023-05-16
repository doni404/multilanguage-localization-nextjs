/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: [
      "default",
      "en",
      "fr",
      "en-gb",
      "fr-fr",
      "fr-be",
      "en-ca",
      "fr-ca",
    ],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "default",
    localeDetection: false,
  },
};