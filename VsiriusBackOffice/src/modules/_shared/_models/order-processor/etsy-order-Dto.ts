export interface EtsyDto {
    receipt_id: number | null;
    receipt_type: number | null;
    seller_user_id: number | null;
    seller_email: string | null;
    buyer_user_id: number | null;
    buyer_email: string | null;
    supplier: string | null;
    name: string | null;
    first_line: string | null;
    second_line: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    status: string | null;
    formatted_address: string | null;
    country_iso: string | null;
    payment_method: string | null;
    payment_email: string | null;
    message_from_seller: string | null;
    message_from_buyer: string | null;
    message_from_payment: string | null;
    is_paid: boolean;
    is_shipped: boolean;
    create_timestamp: number | null;
    created_timestamp: number | null;
    update_timestamp: number | null;
    updated_timestamp: number | null;
    is_gift: boolean;
    gift_message: string | null;
    gift_sender: string | null;
    grandtotal : DtosModel | null;
    subtotal : DtosModel | null;
    total_price : DtosModel | null;
    total_shipping_cost : DtosModel | null;
    total_tax_cost : DtosModel | null;  
    total_vat_cost : DtosModel | null;
    discount_amt : DtosModel | null;
    gift_wrap_price : DtosModel | null;
    shipments : ShipmentDto[];
    transactions : TransactionDto[];
    refunds : RefundDto[];
}

export interface DtosModel {
    amount : number | null;
    divisor : number | null;
    currency_code : string | null;
}

export interface ShipmentDto {
    receipt_shipping_id : number | null;
    shipment_notification_timestamp : number | null;
    carrier_name : string | null;
    tracking_code : string | null;
}

export interface TransactionDto {
    transaction_id : number | null;
    title : string | null;
    description : string | null;
    seller_user_id : number | null;
    buyer_user_id : number | null;
    create_timestamp : number | null;
    created_timestamp : number | null;
    paid_timestamp : number | null;
    shipped_timestamp : number | null;
    quantity : number | null;
    listing_image_id : number | null;
    receipt_id : number | null;
    is_digital : boolean;
    file_data : string | null;
    listing_id : number | null;
    transaction_type : string | null;
    product_id : number | null;
    sku : string | null;
    price : DtosModel | null;
    shipping_cost : DtosModel | null;
    variations : VariationDto | null;
    product_data : ProductDatumDto | null;
    shipping_profile_id : number | null;
    min_processing_days : number | null;
    max_processing_days : number | null;
    shipping_method : string | null;
    shipping_upgrade : string | null;
    expected_ship_date : number | null;
    buyer_coupon : number | null;
    shop_coupon : number | null;
}

export interface RefundDto {
    amount : DtosModel | null;
    created_timestamp : number | null;
    reason : string | null;
    note_from_issuer : string | null;
    status : string | null;
}

export interface VariationDto {
    property_id : number | null;
    value_id : null | null;
    formatted_name : string | null;
    formatted_value : string | null;
}

export interface ProductDatumDto {
    property_id : number | null;
    property_name : string | null;
    scale_id : number | null;
    scale_name : string | null;
    value_ids : number[];
    values : string [];
}

