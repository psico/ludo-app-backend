import firebase from "firebase";
import User = firebase.User;

export const userDataFormat = (userData: User, token: string): object => {
    return {
        user: {
            displayName: userData.displayName ? userData.displayName : userData.email,
            email: userData.email,
            emailVerified: userData.emailVerified,
            uid: userData.uid,
            photoURL: userData.photoURL,
            isLoggedIn: true,
            token: token,
            refreshToken: userData.refreshToken
        }
    }
}

export const chooseCredential = async (body: ReadableStream): Promise<firebase.auth.OAuthCredential | null> => {
    //Login with Google
    // @ts-ignore
    if (body.credential.providerId === "google.com") {
        return firebase.auth.GoogleAuthProvider.credential(
            // @ts-ignore
            body.credential.oauthIdToken,
            // @ts-ignore
            body.credential.oauthAccessToken
        );
    }

    //Login with Facebook
    // @ts-ignore
    if (body?.credential.providerId === "facebook.com") {
        return firebase.auth.FacebookAuthProvider.credential(
            // @ts-ignore
            body.credential.oauthAccessToken
        );
    }

    return null;
}
