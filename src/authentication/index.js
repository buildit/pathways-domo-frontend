import * as Msal from 'msal';
import axios from 'axios';
import store from '../store';

export default class MSALAuthService {
    constructor() {
        // let redirectUri = window.location.origin;
        this.msalAuthority = 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a';
        this.loggedInUser = {idToken: "", adName: "", organizationId: "", username: "", graphToken: ""};
        let msalConfig = {
            auth: {
                clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
                tenantId: '1a6dbb80-5290-4fd1-a938-0ad7795dfd7a',
                authority: this.msalAuthority
            }
        };

        this.graphEndpoint = "https://graph.microsoft.com/v1.0/me";
        this.msalInstance = new Msal.UserAgentApplication(msalConfig);
        this.scopes = {scopes: ['user.read']};
        /*his.msalInstance.handleRedirectCallback((error, response) => {
            if (error) {
                console.log(error);
            } else {
                this.getGraphToken();
            }
            console.log(response);
        });*/
    };

    getAccount() {
        return this.msalInstance.getAccount();
    }

    login() {
        this.msalInstance.loginRedirect(this.scopes);
    }

    logOut() {
        this.msalInstance.logout();
    }

    oldLogin() {
        let dScopes = this.scopes;
        let mi = this.msalInstance;

        return new Promise((resolve, reject) => {
                if (!mi.getAccount()) {
                    this.setupAuth2().then((r) => {
                        store.commit("setIdToken", r);
                    }).then((r) => {
                        let token = mi.acquireTokenSilent(dScopes);
                        this.makeGraphCall(token.accessToken).then(result => {
                            store.commit('setCurrentUser', result.data);
                            store.dispatch('fetchUserProfile');
                        });
                        // this.requestGraphToken();
                    }).then(r => resolve());
                } else {
                    let token = mi.acquireTokenSilent(dScopes);
                    this.makeGraphCall(token.accessToken).then(result => {
                        store.commit('setCurrentUser', result.data);
                        store.dispatch('fetchUserProfile');
                        resolve();
                    });
                }
            }
        );
    }

    /*requestGraphToken() {

            .then(res => {
                this.makeGraphCall(res.accessToken).then(result => {
                    store.commit('setCurrentUser', result.data);
                    store.dispatch('fetchUserProfile');
                });
            }).catch(err => {
            if (err.name === "InteractionRequiredAuthError") {
                this.msalInstance.acquireTokenPopup(this.scopes)
                    .then(response => {
                        r.graphToken = response.accessToken;
                        resolve(r);
                    })
                    .catch(err => {
                        console.error(err);
                        reject();
                    });
            }
        });
    }*/

    /*}).then((r) => {
        this.makeGraphCall(r.accessToken).then(r => {
            store.commit('setCurrentUser', result.data);
            store.dispatch('fetchUserProfile');
            resolve();
        });
    });*/
    goGraph() {
        this.requestGraphToken();
    }

    setupAuth2() {
        return this.msalInstance.loginPopup(this.scopes);
    }


    requestGraphToken2() {
        return this.msalInstance.acquireTokenSilent(this.scopes);
    }


    setupAuth() {
        let account = this.getAccount();
        let user = this.loggedInUser;
        return new Promise((resolve, reject) => {
            if (!account) {
                this.msalInstance.loginPopup(this.scopes).then(response => {
                    user.idToken = response.idToken.rawIdToken;
                    user.adName = response.idToken.name;
                    user.organizationId = response.idToken.preferredName;
                    resolve(user);
                })
                    .catch(err => {
                        console.log(`Could not get login token ${err}`);
                        reject();
                    });
            } else {
                user.idToken = sessionStorage.getItem('msal.idtoken');
                user.adName = account.name;
                user.organizationId = account.userName;
                resolve(user);
            }
        });
    }
    ;


    getGraphToken() {
        this.msalInstance.acquireTokenSilent(this.scopes)
            .then(tokenResponse => {
                console.log('tokenResponse', tokenResponse.accessToken);
                this.makeGraphCall(tokenResponse.accessToken);
            })
            .catch(err => {
                console.log('err', err);
            });
    }


    acquireTokenSilently() {
        return this.msalInstance.acquireTokenSilent(this.scopes);
    }

    makeGraphCall(r) {
        let getHeader = function () {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${r}`
            };
        };

        return axios.get(this.graphEndpoint, {headers: getHeader()});
    }
}
