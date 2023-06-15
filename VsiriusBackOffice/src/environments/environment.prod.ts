const hostname: string = '192.168.1.25';
const ipIdentity: string = `${hostname}${':8087'}`;
const ipProduct: string = `${hostname}${':8082'}`;
const ipOrder: string = `${hostname}${':8090'}`;
export const environment = {
  production: false,
  imageURL: 'http://192.168.1.25:8082',
  apiProductURL: 'http://192.168.1.25:8082/api/',
  apiURL: 'http://192.168.1.25:8087/api/',
  apiOrderURL: 'http://192.168.1.25:8090/api/',
  baseURL: 'http://192.168.1.25:8090',
  apiCSRURL: 'http://192.168.1.25:8091/api/',
  apiCartURL: 'http://192.168.1.25:8088/api/',
  imageURLIdentity: 'http://192.168.1.25:8087/',
  baseCSRURL: 'https://localhost:7152',
  apiSystemURL: 'http://192.168.1.25:8088/api/',
  allowedDomains: [ipIdentity, ipProduct, ipOrder],
  disallowedRoutes: [`${ipIdentity}/api/Auth/Login`],
};
