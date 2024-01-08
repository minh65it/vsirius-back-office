export interface OrderParam {
    startDate: string;
    endDate: string;
    keyword: string
}
export interface Order {
    title: string;
    url: string;
    icon?: string | null;
    index?: number | null
}
