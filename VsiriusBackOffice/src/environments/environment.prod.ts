const hostname: string ='192.168.1.25';

// const port: string = ':7021';

const port: string = ':8087';

const ip: string = `${ hostname }${ port }`;




// const baseUrl: string = `${ protocol }//${ ip }`;

// const ip : string = 'https://localhost:7021/api/'

export const environment = {  

  production: true,

  imageURL: 'http://192.168.1.25:8082',

  apiProductURL: 'http://192.168.1.25:8082/api/',

  apiURL: 'http://192.168.1.25:8087/api/',

  //apiURL: 'https://localhost:7021/api/',

  allowedDomains: [ip],

  disallowedRoutes: [`${ ip }/api/Auth/Login`],

};