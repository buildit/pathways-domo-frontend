import * as Msal from 'msal';
import axios from 'axios';
import store from '../store';

export default class MSALAuthService {
    constructor() {
        // let redirectUri = window.location.origin;
        this.loggedInUser = {idToken: "", adName: "", organizationId: "", username: "", graphToken: ""};
        let msalConfig = {
            auth: {
                clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8'
            }
        };

        this.graphEndpoint = "https://graph.microsoft.com/v1.0/me";
        this.msalInstance = new Msal.UserAgentApplication(msalConfig);
        this.scopes = {scopes: ['user.read']};
    };

    getAccount() {
        return this.msalInstance.getAccount();
    }

    login() {
        return new Promise((resolve, reject) => {
            this.setupAuth()
                .then(
                    (r) => this.requestGraphToken(r)
                    .then(
                        (r) => this.makeGraphCall(r).then( res => resolve(res))
                    ));
        });
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
                resolve(user);
            }
        });
    };

    requestGraphToken(r) {
        this.loggedInUser = r;

        return new Promise((resolve, reject) => {
            this.msalInstance.acquireTokenSilent(this.scopes)
                .then(res => {
                    r.graphToken = res.accessToken;
                    resolve(r);
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
        });
    }

    makeGraphCall(r) {
        return new Promise((resolve, reject) => {
            let getHeader = function () {
                return {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${r.graphToken}`
                };
            };

            return axios.get(this.graphEndpoint, {headers: getHeader()}).then(res => resolve(res));
        });
    }
}
