export interface VsiriusFilterDto {
    filterId: number;
    fieldName: string | null;
    labelName: string | null;
    value: string | null;
    productType: string | null;
    groupName: string | null;
    parentId: number | null;
    orderId: number | null;
    imageURL: string | null;
    isActive: boolean | null;
    isDelete: boolean | null;
    createdBy: string | null;
    createdDate: string | null;
    updatedBy: string | null;
    updatedDate: string | null;
    createdDateFrom: string | null;
    createdDateTo: string | null;
    updatedDateFrom: string | null;
    updatedDateTo: string | null;
    fileImage: string | File;
    title: string | null;
}