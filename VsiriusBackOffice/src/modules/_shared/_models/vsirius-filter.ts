export interface VsiriusFilter {
    fieldName: string;
    labelName: string;
    value: string[];
    productType: string;
    groupName: string
}
export interface SearchParams {
    keyword: string;
    minPrice: number;
    maxPrice: number;
    includeNoStock: boolean;
}
