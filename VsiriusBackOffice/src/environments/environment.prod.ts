const ip: string = 'http://192.168.1.25:8087/api/';
const baseUrl: string = 'http://192.168.1.25:8087';

export const environment = {
  production: true,
  apiUrl: `${ baseUrl }/api/`,
  baseUrl: `${ baseUrl }/`,
  allowedDomains: [ip],
  disallowedRoutes: [`${ ip }/api/Auth/Login`],
};
