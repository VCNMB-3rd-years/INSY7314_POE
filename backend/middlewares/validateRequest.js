// /server/middleware/validateRequest.js
const { getValidator } = require('../utils/validators');

// helper: get nested value by path "accounts[].accountNumber" or "profile.email"
function getByPath(obj, path) {
  if (!obj) return undefined;
  const parts = path.split('.');
  let cur = obj;
  for (let p of parts) {
    // array token, e.g. "items[]" or "accounts[]"
    if (p.endsWith('[]')) {
      const arrName = p.slice(0, -2);
      cur = cur && cur[arrName];
      if (!Array.isArray(cur)) return undefined;
      // on arrays we return the array itself and let middleware validate each element later
      return cur;
    } else {
      cur = cur && cur[p];
    }
    if (cur === undefined) return undefined;
  }
  return cur;
}

function applyPattern(value, pattern) {
  if (typeof pattern === 'function') return pattern(value);
  if (pattern instanceof RegExp) return pattern.test(String(value));
  return false;
}

/**
 * schema example:
 * {
 *   body: {
 *     username: 'username',             // maps to validators.username
 *     password: 'password',
 *     accounts: 'object',               // special: use regex or function instead
 *     'accounts[].accountNumber': 'accountNumber' // validates each element's account number
 *   },
 *   params: { id: 'objectId' },
 *   query: { q: /^(search|filter)$/ }
 * }
 */
function validateRequest(schema = {}) {
  return (req, res, next) => {
    try {
      const locations = ['params', 'query', 'body'];
      for (const loc of locations) {
        if (!schema[loc]) continue;
        const defs = schema[loc];
        for (const key of Object.keys(defs)) {
          const spec = defs[key];
          // allow { pattern: 'username', optional: true } style
          let patternSpec = spec;
          let optional = false;
          if (spec && typeof spec === 'object' && !(spec instanceof RegExp) && !(spec instanceof Function)) {
            patternSpec = spec.pattern;
            optional = !!spec.optional;
          }

          const validator = getValidator(patternSpec);
          // support if patternSpec is a regex or function too:
          const rawVal = getByPath(req[loc], key);

          // If the key refers to an array (via []), validate each element/field
          if (key.includes('[]')) {
            const arr = rawVal;
            if (!arr) {
              if (!optional) return res.status(400).json({ error: `${loc}.${key} is required` });
              continue;
            }
            if (!Array.isArray(arr)) return res.status(400).json({ error: `${loc}.${key} must be an array` });

            // if validator is function/regex, apply to each array element or property
            for (const item of arr) {
              // if patternSpec is a nested path like "accountNumber" (for objects), attempt to validate item[patternSpec]
              if (typeof patternSpec === 'string' && typeof item === 'object' && item !== null && item.hasOwnProperty(patternSpec)) {
                const v = item[patternSpec];
                if (!applyPattern(v, validator)) return res.status(400).json({ error: `${loc}.${key} element invalid (${patternSpec})` });
              } else {
                if (!applyPattern(item, validator)) return res.status(400).json({ error: `${loc}.${key} element invalid` });
              }
            }
            continue;
          }

          // Normal single-value fields
          if (rawVal === undefined || rawVal === null || rawVal === '') {
            if (!optional) return res.status(400).json({ error: `${loc}.${key} is required` });
            else continue;
          }

          // If validator is null, accept any (but prefer explicit patterns)
          if (!validator) continue;

          if (!applyPattern(rawVal, validator)) {
            return res.status(400).json({ error: `${loc}.${key} failed validation` });
          }
        } // keys
      } // locations

      // all ok
      next();
    } catch (err) {
      console.error('Validation middleware error', err);
      return res.status(500).json({ error: 'validation error' });
    }
  };
}

module.exports = validateRequest;
