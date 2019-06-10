import * as Msal from 'msal';

export default {}

export default class AuthService {
    constructor() {
        let PROD_REDIRECT_URI = 'https://pathways.buildit.systems/';
        let redirectUri = window.location.origin;
        /*        if (window.location.hostname !== '127.0.0.1') {
                    redirectUri = PROD_REDIRECT_URI;
                }*/

        this.applicationConfig = {
            clientID: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8', // pathways-ad-support
            graphScopes: ['user.read']
        };
        this.app = new Msal.UserAgentApplication(
            this.applicationConfig.clientID,
            '',
            () => {
                // callback for login redirect
            },
            {
                redirectUri
            }
        );
    };

    loginRedir() {
        return this.app.loginRedirect(this.applicationConfig.graphScopes);
    }

    login() {
        return this.app.loginPopup(this.applicationConfig.graphScopes).then(
            idToken => {
                const user = this.app.getUser();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
            () => {
                return null;
            }
        );
    };

    logout() {
        this.app.logout();
    };

    getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
            accessToken => {
                return accessToken;
            },
            error => {
                return this.app
                    .acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then(
                        accessToken => {
                            return accessToken;
                        },
                        err => {
                            console.error(err);
                        }
                    );
            }
        );
    };
}
