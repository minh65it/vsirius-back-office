const protocol: string = window.location.protocol;
const hostname: string = window.location.hostname;
const port: string = ':7021';
// const ip: string = `${ hostname }${ port }`;
// const baseUrl: string = `${ protocol }//${ ip }`;
const ip : string = 'http://192.168.1.25:8087'
export const environment = {  
  production: false,
  imageURL: 'http://192.168.1.25:8082',
  apiProductURL: 'http://192.168.1.25:8082/api/',
  apiURL: 'http://192.168.1.25:8087/api/',
  // apiURL: 'https://localhost:7021/api/',
  allowedDomains: [ip],
  disallowedRoutes: [`${ ip }/api/Auth/Login`],
};
