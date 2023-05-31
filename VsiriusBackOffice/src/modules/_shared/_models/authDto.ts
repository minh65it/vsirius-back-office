export interface AuthDto {

}

export interface UserForLogged {
    isLogin: boolean;
    user: string;
    roles: string[];
    token: string;
}

export interface UserForLoginParam {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface TokenRequestParam {
    token: string;
    accountType: string;
}

export interface UserReturned {
    token: string;
    refreshToken: string;
    userId: number;
    userName: string;
    avartar: string;
    type: string;
}