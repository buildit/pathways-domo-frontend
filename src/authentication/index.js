import * as Msal from 'msal';
import axios from 'axios';
import store from '../store';

export default class MSALAuthService {
    constructor() {
        // let redirectUri = window.location.origin;
        this.msalAuthority = 'https://login.microsoftonline.com/1a6dbb80-5290-4fd1-a938-0ad7795dfd7a';

        let msalConfig = {
            auth: {
                authority: this.msalAuthority,
                clientId: 'fd8a25a4-d4ae-4ec9-96e7-bec62ae45ca8',
                redirectUrl: "http://localhost:3110",

            },
            system: {
                logger: new Msal.Logger(this.log, {
                    level: Msal.LogLevel.Verbose,
                    piiLoggingEnabled: true,
                    correlationId: "wokays"
                }),

            }
        };
        this.graphEndpoint = "https://graph.microsoft.com/v1.0/me";

        if (!store.state.msalAgent) {
            let inst = new Msal.UserAgentApplication(msalConfig);
            store.commit('setMsalAgent', inst);
        }

        this.msalInstance = store.state.msalAgent;

        // this.scopes = {scopes: ['https://graph.microsoft.com/user.read']};
        this.scopes = {scopes: ['https://graph.microsoft.com/user.read']};
        this.msalInstance.handleRedirectCallback((error, response) => {
            if (error) {
                console.log(error);
            } else {
                console.log(response);
            }

        });
    };

    log(level, message, p2) {
        console.log(`${level}-${p2}: ${message}`);
    }

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
        let mi = this.msalInstance;

        return new Promise((resolve, reject) => {
                if (!mi.getAccount()) {
                    this.setupAuth2().then((r) => {
                        store.commit("setIdToken", r);
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        );
    }

    async getOrAcquireSilently() {
        console.log('start waiting');
        this.acquiring = true;
        let x = await this.msalInstance.acquireTokenSilent(this.scopes);
        return x;
    }

    async goGraph() {
        let token = await this.msalInstance.acquireTokenSilent(this.scopes);

        return this.makeGraphCall(token.accessToken);
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

    setupAuth2() {
        return this.msalInstance.loginPopup(this.scopes);
    }
}
