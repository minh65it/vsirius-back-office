export interface QgoldFtpOrderObject {
    orderId: string;
    format: string;
    customer: string;
    pO: string;
    shipToName: string;
    shipToAddress1: string;
    shipToAddress2: string;
    shipToAddress3: string;
    shipToCity: string;
    shipToState_Province: string;
    shipToZip: string;
    shipToCountryCode: string;
    shipToPhone: string;
    item: QgoldFtpOrderItem[];
    vSiriusItem: string;
    description: string;
    ship_Method_Code: string;
    ship_Option_Code: string;
    gift_Message: string;
    cust_Order_Number: string;
    amz_Order_ID: string;
    amz_Item_ID: string;
    timeStamp: string;
    status: string;
    marketplace: string;
}

export interface QgoldFtpOrderItem {
    item: string;
    qty: string;
    size: string;
    price: string;
}