const hostname: string = '42.113.172.2';
// const port: string = ':7021';
const port: string = ':8087';
const ip: string = `${hostname}${port}`;
export const environment = {
  production: true,
  apiCartURL: 'http://42.113.172.2:8088/api/',
  allowedDomains: [ip],
  disallowedRoutes: [`${ip}/api/Auth/Login`],
  imageURL: 'http://42.113.172.2:8082',
  apiProductURL: 'http://42.113.172.2:8082/api/',
  apiURL: 'http://42.113.172.2:8087/api/',


  apiOrderURL: 'http://42.113.172.2:8090/api/',
  // apiOrderURL: `${ protocol }//${ ip }/api/`,
  // apiURL: 'https://localhost:7014/api/',
  // baseURL: 'https://localhost:7014/',
  baseURL: 'http://42.113.172.2:8090',
};
