import { createIntl, createIntlCache } from "react-intl";

let cache;
let intl;

/**
 * Generate IntlShape object
 * @param {Object} props
 * @param {String} props.locale - User specified language
 * @param {Object} props.messages - Messages
 * @returns {Object}
 */
const generateIntl = (props) => {
  if (cache) {
    cache = null;
  }

  cache = createIntlCache();

  intl = createIntl(props, cache);
  return intl;
};

export { generateIntl, intl };
