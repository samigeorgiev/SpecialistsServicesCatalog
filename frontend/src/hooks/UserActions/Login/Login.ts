export interface Login {
    doLogin: (token: string, expiresIn: number) => void;
}
