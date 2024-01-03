const hostname: string = '118.69.37.20';
const ipIdentity: string = `${hostname}${':8087'}`;
const ipProduct: string = `${hostname}${':8082'}`;
const ipOrder: string = `${hostname}${':8090'}`;
const ipOrderProcessor: string = `${hostname}${':8089'}`;
const ipReturnOrderAmazon: string = `${hostname}${':8083'}`;
const ipReturnOrderWalmart: string = `${hostname}${':8093'}`;
const ipPackage: string = `${hostname}${':8095'}`;
//csr, favorite, notification, page view
const ipContact: string = `${hostname}${':8091'}`;

export const environment = {
    production: false,
    imageURL: 'http://118.69.37.20:8082',
    apiProductURL: 'http://118.69.37.20:8082/api/',
    apiURL: 'http://118.69.37.20:8087/api/',
    imageURLIdentity: 'http://118.69.37.20:8087/',
    apiOrderURL: 'http://118.69.37.20:8090/api/',
    apiOrderProcessorURL: 'http://118.69.37.20:8089/api/',
    apiReturnOrderAmazonURL: 'https://localhost:5000/api/',
    apiReturnOrderWalmartURL: 'https://localhost:7205/api/',
    apiPackageURL: 'https://localhost:7275/api/',
    apiCSRURL: 'http://118.69.37.20:8091/api/',
    baseCSRURL: 'http://118.69.37.20:8091',
    clientIdCart: "OrderApi",
    clientSecretCart: "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJkYXRhIjoiN2MwMTgxOTMtN2I4Yi00ODNmLTllZDAtNTUxZjk5NTQ1YzI2LU9yZGVyQXBpIiwibmJmIjoxNjg3NTA3NDAzLCJleHAiOjE2ODc1MTEwMDMsImlhdCI6MTY4NzUwNzQwM30.",
    clientIdOrderProcessor: "OrderStullerQgoldApi",
    clientSecretOrderProcessor: "90b34412-b58e-4f88-ab30-0c1da8a139d8-OrderAPI",
    apiSystemURL: 'http://118.69.37.20:8086/api/',
    signalOrderURL: 'http://192.168.1.92:8090',
    allowedDomains: [ipIdentity, ipProduct, ipOrder, ipContact, ipPackage],
    disallowedRoutes: [`${ipIdentity}/api/Auth/Login`],
};
