// Entrypoint for @vercel/express: .cjs extension guarantees CommonJS execution
// on Vercel serverless runtime regardless of package.json "type" field.
require('express');
const mod = require('./dist-vercel/index.cjs');

module.exports = mod.default || mod;
