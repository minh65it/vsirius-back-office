export interface OrderParam {
    startDate: string;
    endDate: string;
    keyword: string
}
export interface Order {
    title: string;
    url?: string | null;
    icon?: string | null;
    index?: number | null;
    items?: Order[];
    visible?: boolean;
}
