const hostname: string = '192.168.1.92';
const ipIdentity: string = `${hostname}${':7001/identity'}`;
const ipProduct: string = `${hostname}${':7001/product'}`;
const ipOrder: string = `${hostname}${':7001/order'}`;
const ipCsr: string = `${hostname}${':7001/csr'}`;
const ipPackage: string = `${hostname}${':7001/package'}`;
const ipOrderProcessor: string = `${hostname}${':8089'}`;
const ipReturnOrderAmazon: string = `${hostname}${':8083'}`;
const ipReturnOrderWalmart: string = `${hostname}${':8093'}`;
const domainManager: string = `http://${hostname}${':7001'}`;

export const environment = {
  production: true,
  clientIdCart: "OrderApi",
  clientSecretCart: "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjoiN2MwMTgxOTMtN2I4Yi00ODNmLTllZDAtNTUxZjk5NTQ1YzI2LU9yZGVyQXBpIiwibmJmIjoxNjg3NTA3NDAzLCJleHAiOjE2ODc1MTEwMDMsImlhdCI6MTY4NzUwNzQwM30.",
  clientIdOrderProcessor: "OrderStullerQgoldApi",
  clientSecretOrderProcessor: "90b34412-b58e-4f88-ab30-0c1da8a139d8-OrderAPI",

  imageURL: `${domainManager}/product`,
  apiProductURL: `${domainManager}/product/api/`,

  apiURL: `${domainManager}/identity/api/`,
  imageURLIdentity: `${domainManager}/identity/`,

  apiOrderURL: `${domainManager}/order/api/`,
  signalOrderURL: `${domainManager}/order`,
  apiOrderProcessorURL: `${domainManager}/orderprocess/api/`,
  apiReturnOrderAmazonURL: 'http://192.168.1.91:8083/api/',
  apiReturnOrderWalmartURL: 'http://192.168.1.91:8093/api/',
  apiPackageURL: `${domainManager}/package/api/`,

  apiCSRURL: `${domainManager}/csr/api/`,
  baseCSRURL: `${domainManager}/csr`,

  apiSystemURL: `${domainManager}/system/api/`,
  allowedDomains: [ipIdentity, ipProduct, ipOrder, ipCsr, ipPackage],
  disallowedRoutes: [`${ipIdentity}/api/Auth/Login`],
};
