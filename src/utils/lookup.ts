const whois = require('whois');

export const loukup = (
  domain: string,
  server: string,
  callback: (err: any, data: any) => void
) => whois.lookup(domain, { server: server }, callback);
