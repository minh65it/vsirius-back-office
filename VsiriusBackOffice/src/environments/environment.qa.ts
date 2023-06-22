const hostname: string = '192.168.1.186';
const ipIdentity: string = `${hostname}${':8087'}`;
const ipProduct: string = `${hostname}${':8082'}`;
const ipOrder: string = `${hostname}${':8090'}`;
const ipContact: string = `${hostname}${':8091'}`;
export const environment = {
  production: true,
  imageURL: 'http://192.168.1.186:8082',
  apiProductURL: 'http://192.168.1.186:8082/api/',
  apiURL: 'http://192.168.1.186:8087/api/',
  imageURLIdentity: 'http://192.168.1.186:8087/',
  apiOrderURL: 'http://192.168.1.186:8090/api/',
  apiCSRURL: 'http://192.168.1.186:8091/api/',
  baseCSRURL: 'http://192.168.1.186:8091',
  apiCartURL: 'http://192.168.1.186:8088/api/',
  apiSystemURL: 'http://192.168.1.186:8086/api/',
  baseURL: 'http://192.168.1.186:8090',
  allowedDomains: [ipIdentity, ipProduct, ipOrder, ipContact],
  disallowedRoutes: [`${ipIdentity}/api/Auth/Login`],
};
