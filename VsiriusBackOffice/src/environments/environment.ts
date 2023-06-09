const protocol: string = window.location.protocol;
const hostname: string = window.location.hostname;
// const hostname: string ='192.168.1.25';
const port: string = ':7014';
// const port: string = ':8087';
const ip: string = `${ hostname }${ port }`;

// const baseUrl: string = `${ protocol }//${ ip }`;
// const ip : string = 'https://localhost:7021/api/'
export const environment = {  
  production: false,
  imageURL: 'http://192.168.1.25:8082',
  apiProductURL: 'http://192.168.1.25:8082/api/',
  apiURL: 'http://192.168.1.25:8087/api/',
  apiOrderURL: 'http://192.168.1.25:8090/api/',
  // apiOrderURL: `${ protocol }//${ ip }/api/`,
  // apiURL: 'https://localhost:7014/api/',
  // baseURL: 'https://localhost:7014/',
  baseURL: 'http://192.168.1.25:8090',
  allowedDomains: [ip],
  disallowedRoutes: [`${ ip }/api/Auth/Login`],
};