const hostname: string = '192.168.1.25';
const ipIdentity: string = `${hostname}${':8087'}`;
const ipProduct: string = `${hostname}${':8082'}`;
const ipOrder: string = `${hostname}${':8090'}`;

export const environment = {
  production: false,
  imageURL: 'http://192.168.1.25:8082',
  apiProductURL: 'http://192.168.1.25:8082/api/',
  apiURL: 'http://192.168.1.25:8087/api/',
  imageURLIdentity: 'http://192.168.1.25:8087/',
  apiOrderURL: 'http://192.168.1.25:8090/api/',
  apiCSRURL: 'http://192.168.1.25:8091/api/',
  baseCSRURL: 'http://192.168.1.25:8091',
  // apiOrderURL: `https://localhost:7014/api/`,
  // apiURL: 'https://localhost:7014/api/',
  // baseURL: 'https://localhost:7014',
  apiCartURL: 'http://192.168.1.25:8088/api/',
  baseURL: 'http://192.168.1.25:8090',
  allowedDomains: [ipIdentity, ipProduct, ipOrder],
  disallowedRoutes: [`${ipIdentity}/api/Auth/Login`],
};
