export interface Customer {
    id: string;
    email: string | null;
    userName: string | null;
    phoneNumber: string | null;
    password: string | null;
    address: string | null;
    avatar: string | null;
    isActive: boolean | null;
    fileImage:File;
}

export interface CustomerForLoggedDto {
    isLogin: boolean;
    user: Customer;
    token: string;
}