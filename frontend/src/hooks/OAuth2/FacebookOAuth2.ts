export interface FacebookOAuth2 {
    redirectToFacebookLogIn: () => void;
    authorization: Authorization;
}

export interface Authorization {
    doAuthorization: (code: string) => void;
    error?: string;
    finished: boolean;
}