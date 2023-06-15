export interface Contact {
    id: string;
    email: string;
    phone: string;
    fullName: string;
    content: string;
    createTime: string;
    updateTime: string | Date;
    status: boolean;
    employeeId: string;
    employeeName: string;
}