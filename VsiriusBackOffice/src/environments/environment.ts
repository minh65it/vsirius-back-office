const hostname: string = '192.168.2.163';
const ipIdentity: string = `${hostname}${':5202/identity'}`;
const ipProduct: string = `${hostname}${':5202/product'}`;
const ipOrder: string = `${hostname}${':5202/order'}`;
const ipCsr: string = `${hostname}${':5202/csr'}`;
const ipPackage: string = `${hostname}${':5202/package'}`;
const ipOrderProcessor: string = `${hostname}${':5215'}`;
const ipAmazon: string = `${hostname}${':5213'}`;
const ipWalmart: string = `${hostname}${':5214'}`;
const domainManager: string = `http://${hostname}${':5202'}`;

export const environment = {
  production: true,
  qa: false,
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
  apiStullerOrderURL: `${domainManager}/stullerOrder/`,
  apiAmazonURL: `${domainManager}/amazon/api/`,
  apiWalmartURL: `${domainManager}/walmart/api/`,
  apiPackageURL: `${domainManager}/package/api/`,

  apiCSRURL: `${domainManager}/csr/api/`,
  baseCSRURL: `${domainManager}/csr`,

  apiSystemURL: `${domainManager}/system/api/`,
  allowedDomains: [ipIdentity, ipProduct, ipOrder, ipCsr, ipPackage],
  disallowedRoutes: [`${ipIdentity}/api/Auth/Login`],
};
