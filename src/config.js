'use strict';

function mustInt(name, v, def) {
  const n = v == null || v === '' ? def : Number(v);
  if (!Number.isInteger(n) || n <= 0) throw new Error(`Invalid ${name}: ${v}`);
  return n;
}

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  bindHost: process.env.BIND_HOST || '127.0.0.1',
  port: mustInt('PORT', process.env.PORT, 3000),
};

module.exports = { config };
