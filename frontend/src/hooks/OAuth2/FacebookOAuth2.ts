export interface FacebookOAuth2 {
    redirectToFacebookLogin: () => void;
    authorization: Authorization;
}

export interface Authorization {
    doAuthorization: (code: string) => void;
    error?: string;
    finished: boolean;
}
