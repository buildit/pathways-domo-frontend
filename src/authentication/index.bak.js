import AuthenticationContext from 'adal-angular/lib/adal.js';

const config = {
    clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8', // pathways-ad-support
    tenant: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
    redirectUri: 'http://localhost:3110/',
    cacheLocation: 'localStorage'
};

export default {
    authenticationContext: null,
    /**
     * @return {Promise}
     */
    initialize() {
        this.authenticationContext = new AuthenticationContext(config);

        return new Promise((resolve, reject) => {
            if (this.authenticationContext.isCallback(window.location.hash) || window.self !== window.top) {
                // redirect to the location specified in the url params.
                this.authenticationContext.handleWindowCallback();
            } else {
                // try pull the user out of local storage
                let user = this.authenticationContext.getCachedUser();
                if (user) {
                    resolve();
                } else {
                    // no user at all - go sign in.
                    this.signIn();
                }
            }
        });
    },

    acquireToken() {
        return new Promise((resolve, reject) => {
            this.authenticationContext.acquireToken('<azure active directory resource id>', (error, token) => {
                if (error || !token) {
                    return reject(error);
                } else {
                    return resolve(token);
                }
            });
        });
    },

    acquireTokenRedirect() {
        this.authenticationContext.acquireTokenRedirect('<azure active directory resource id>');
    },
    getCachedToken() {
        return this.authenticationContext.getCachedToken(config.clientId);
    },
    isAuthenticated() {
        // getCachedToken will only return a valid, non-expired token.
        if (this.authenticationContext.getCachedToken(config.clientId)) {
            return true;
        }
        return false;
    },
    /**
     * @return An ADAL user profile object.
     */
    getUserProfile() {
        return this.authenticationContext.getCachedUser().profile;
    },
    getUser() {
        return this.authenticationContext.getCachedUser();
    },
    signIn() {
        this.authenticationContext.login();
    },
    signOut() {
        this.authenticationContext.logOut();
    }
};
