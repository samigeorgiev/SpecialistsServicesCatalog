export interface User {
    token: string;
    tokenExpiresIn: number;
    isSpecialist?: boolean;
}
