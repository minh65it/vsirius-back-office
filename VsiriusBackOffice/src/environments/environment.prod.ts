const hostname: string ='192.168.1.25';
const ip: string = `${ hostname }${ ':8087' }`;
const ip1: string = `${ hostname }${ ':8082' }`;
const ip2: string = `${ hostname }${ ':8090' }`;

export const environment = {  
  production: false,
  imageURL: 'http://192.168.1.25:8082',
  apiProductURL: 'http://192.168.1.25:8082/api/',
  apiURL: 'http://192.168.1.25:8087/api/',
  apiOrderURL: 'http://192.168.1.25:8090/api/',
  apiCSRURL: 'http://192.168.1.25:8091/api/',
  baseCSRURL: 'http://192.168.1.25:8091',
  baseURL: 'http://192.168.1.25:8090',
  allowedDomains: [ip,ip1,ip2],
  disallowedRoutes: [`${ ip }/api/Auth/Login`],
};