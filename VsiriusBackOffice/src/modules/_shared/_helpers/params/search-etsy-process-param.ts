export interface EtsyProcessSearchParam {
    ids: number | null;
    name: string | null;
    address : string | null;
    fromDate: string | null;
    toDate: string | null;
    buyer_email: string | null;
    is_paid: boolean | null;
    is_shipped: boolean | null;
    is_submit: boolean | null; 
}