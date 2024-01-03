export interface ReturnOrder {
    returnOrderId: string;
    customerEmailId: string;
    returnType: string;
    replacementCustomerOrderId: string;
    customerName: CustomerName;
    customerOrderId: string;
    returnOrderDate: string;
    returnByDate: string;
    refundMode: string;
    totalRefundAmount: TotalRefundAmount;
    returnLineGroups: ReturnLineGroup[];
    returnOrderLines: ReturnOrderLine[];
    returnChannel: ReturnChannel;
}

export interface CarrierInfoList {
    carrierId: string;
    carrierName: string;
    serviceType: string;
    trackingNo: string;
}

export interface Charge {
    chargeCategory: string;
    chargeName: string;
    chargePerUnit: ChargePerUnit;
    isDiscount: boolean;
    isBillable: boolean;
    tax: Tax[];
    excessCharge: ExcessCharge;
    references: Reference[];
}

export interface ChargePerUnit {
    currencyAmount: number;
    currencyUnit: string;
}

export interface ChargeTotal {
    name: string;
    value: Value;
}

export interface CurrentTrackingStatus {
    status: string;
    statusTime: string;
    currentRefundStatus: string;
    quantity: Quantity;
}

export interface CustomerName {
    firstName: string;
    lastName: string;
}

export interface ExcessCharge {
    currencyAmount: string;
    currencyUnit: string;
}

export interface ExcessTax {
    currencyAmount: string;
    currencyUnit: string;
}

export interface Item {
    sku: string;
    condition: string;
    productName: string;
    itemWeight: ItemWeight;
}

export interface ItemWeight {
    unitOfMeasure: string;
    measurementValue: string;
}

export interface Label {
    labelImageURL: string;
    carrierInfoList: CarrierInfoList[];
}

export interface Quantity {
    unitOfMeasure: string;
    measurementValue: string;
}

export interface Reference {
    name: string;
    value: string;
}

export interface RefundChannel {
    refundChannelName: string;
    quantity: Quantity;
}

export interface ReturnChannel {
    channelName: string;
}

export interface ReturnLine {
    returnOrderLineNumber: number;
}

export interface ReturnLineGroup {
    groupNo: number;
    returnLines: ReturnLine[];
    labels: Label[];
    returnExpectedFlag: boolean;
}

export interface ReturnOrderLine {
    returnOrderLineNumber: number;
    salesOrderLineNumber: number;
    returnReason: string;
    purchaseOrderId: string;
    sellerOrderId: string;
    purchaseOrderLineNumber: number;
    isReturnForException: boolean;
    exceptionItemType: string;
    rechargeReason: string;
    returnCancellationReason: string;
    item: Item;
    charges: Charge[];
    unitPrice: UnitPrice;
    chargeTotals: ChargeTotal[];
    currentDeliveryStatus: string;
    currentRefundStatus: string;
    currentTrackingStatuses: CurrentTrackingStatus[];
    refundChannels: RefundChannel[];
    cancellableQty: number;
    quantity: Quantity;
    returnExpectedFlag: boolean;
    isFastReplacement: boolean;
    isKeepIt: boolean;
    lastItem: boolean;
    refundedQty: string;
    rechargeableQty: string;
    refundChannel: string;
    returnTrackingDetail: ReturnTrackingDetail[];
    status: string;
    statusTime: string;
}

export interface ReturnTrackingDetail {
    sequenceNo: number;
    eventTag: string;
    eventDescription: string;
    eventTime: string;
    references: Reference[];
}

export interface Tax {
    taxName: string;
    excessTax: ExcessTax;
    taxPerUnit: TaxPerUnit;
}

export interface TaxPerUnit {
    currencyAmount: number;
    currencyUnit: string;
}

export interface TotalRefundAmount {
    currencyAmount: number;
    currencyUnit: string;
}

export interface UnitPrice {
    currencyAmount: number;
    currencyUnit: string;
}

export interface Value {
    currencyAmount: number;
    currencyUnit: string;
}