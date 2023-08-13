const hostname: string = '192.168.2.151';
const ipIdentity: string = `${hostname}${':8087'}`;
const ipProduct: string = `${hostname}${':8082'}`;
const ipOrder: string = `${hostname}${':8090'}`;
const ipContact: string = `${hostname}${':8091'}`;

export const environment = {
  production: false,
  imageURL: 'http://192.168.2.151:8082',
  apiProductURL: 'http://192.168.2.151:8082/api/',
  apiURL: 'http://192.168.2.151:8087/api/',
  imageURLIdentity: 'http://192.168.2.151:8087/',
  apiOrderURL: 'http://192.168.2.151:8090/api/',
  apiCSRURL: 'http://192.168.2.151:8091/api/',
  baseCSRURL: 'http://192.168.2.151:8091',
  clientIdCart: "OrderApi",
  clientSecretCart: "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjoiN2MwMTgxOTMtN2I4Yi00ODNmLTllZDAtNTUxZjk5NTQ1YzI2LU9yZGVyQXBpIiwibmJmIjoxNjg3NTA3NDAzLCJleHAiOjE2ODc1MTEwMDMsImlhdCI6MTY4NzUwNzQwM30.",
  apiSystemURL: 'http://192.168.2.151:8086/api/',
  baseURL: 'http://192.168.2.151:8090',
  allowedDomains: [ipIdentity, ipProduct, ipOrder, ipContact],
  disallowedRoutes: [`${ipIdentity}/api/Auth/Login`],
};
