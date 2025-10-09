// /server/utils/validators.js
const validators = {
  // identities & names
  username: /^[A-Za-z0-9_.-]{3,30}$/,                 // letters, numbers, underscore/dot/hyphen
  fullName: /^[A-Za-z ,.'-]{2,80}$/,                 // common name chars
  nationalId: /^\d{13}$/,                            // South African ID (13 digits)
  // accounts & amounts
  accountNumber: /^\d{8,20}$/,                       // bank account numbers (8-20 digits)
  amount: /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,          // numeric with up to 2 decimals
  // credentials
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,72}$/, // strong password
  // currencies & providers (whitelist)
  currency: /^(ZAR|USD|EUR|GBP|JPY|AUD|CAD|CHF|CNY)$/,
  provider: /^(SWIFT)$/,
  // SWIFT / BIC code
  swift: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/, // 8 or 11 chars
  // transaction metadata
  status: /^(PENDING|VERIFIED|FAILED|SUBMITTED)$/,
  // mongodb object id (24 hex chars)
  objectId: /^[a-fA-F0-9]{24}$/
};

function getValidator(spec) {
  // spec may be:
  //  - a string key (like "username") -> validators[spec]
  //  - a RegExp -> use it
  //  - a function -> custom validator
  if (typeof spec === 'string') return validators[spec] || null;
  if (spec instanceof RegExp) return spec;
  if (typeof spec === 'function') return spec;
  return null;
}

module.exports = { validators, getValidator };
