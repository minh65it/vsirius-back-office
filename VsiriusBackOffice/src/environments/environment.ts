const protocol: string = window.location.protocol;
const hostname: string = window.location.hostname;
const port: string = ':7021';
const ip: string = `${ hostname }${ port }`;
const baseUrl: string = `${ protocol }//${ ip }`;

export const environment = {  
  production: false,
  imageURL: 'http://192.168.1.25:8082',
  // apiURL: 'http://192.168.1.25:8082/api/',
  apiURL: 'https://localhost:7021/api/',
  allowedDomains: [ip],
  disallowedRoutes: [`${ ip }/api/Auth/Login`],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
