const ip: string = 'http://192.168.1.25:8087/api/';
const baseUrl: string = 'http://192.168.1.25:8087';

export const environment = {
  production: true,
  apiUrl: `${baseUrl}/api/`,
  baseUrl: `${baseUrl}/`,
  apiCartURL: 'https://localhost:7026/api/',
  allowedDomains: [ip],
  disallowedRoutes: [`${ip}/api/Auth/Login`],
};
