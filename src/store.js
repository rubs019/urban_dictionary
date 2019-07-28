const Logger = require('./helpers/logger');
export let userConnectedCredential;
export default {
    state: {
        isConnected: !!localStorage.getItem('isConnected')
    },
    language: localStorage.getItem('language'),
    /**
     * Save the user credentials in the store
     *
     * @param fieldName Nom du champ a mettre a jour
     * @param credentials
     * @return boolean || null
     */
    setUser(credentials, fieldName) {
        if (!credentials)
            return false;
        if (!fieldName) {
            Logger('SetUser triggered with no fieldName,', credentials);
            userConnectedCredential = {
                id: credentials.id,
                username: credentials.username,
                email: credentials.email,
                role: credentials.role,
                token: credentials.token,
                karma: credentials.karma && credentials.karma >= 0 ? credentials.karma.toString() : undefined,
                locale: credentials.locale
            };
            localStorage.setItem('credentials', JSON.stringify(userConnectedCredential));
            return true;
        }
        Logger(`SetUser triggered with fieldName = ${fieldName}`, credentials);
        // Check if the property exist on credentials
        if (!userConnectedCredential.hasOwnProperty(fieldName))
            return false;
        // @ts-ignore
        userConnectedCredential[fieldName] = credentials;
        localStorage.setItem('credentials', JSON.stringify(userConnectedCredential));
        return true;
    },
    /**
     * Set user connection state
     * @param newValue {boolean}
     * @return undefined
     */
    setConnected(newValue) {
        if (typeof newValue !== "boolean") {
            Logger(`setConnected require a boolean but received a ${typeof newValue}`, newValue);
            return;
        }
        Logger("setConnected triggered with", newValue);
        this.state.isConnected = newValue;
        localStorage.setItem('isConnected', newValue.toString());
    },
    /**
     * Set language website
     * @param language {string}
     * @return undefined
     */
    setLanguage(language) {
        const i18n = require('./i18n').default;
        Logger("setLanguage triggered with language = ", language);
        localStorage.setItem('language', language);
        this.language = language;
        i18n.locale = language;
    },
    /**
     * Use to clear all store
     * @return undefined
     */
    clear() {
        this.state.isConnected = false;
        userConnectedCredential = {
            id: undefined,
            username: undefined,
            email: undefined,
            role: undefined,
            token: undefined,
            karma: undefined,
            locale: undefined
        };
        localStorage.removeItem('credentials');
        localStorage.removeItem('isConnected');
    }
};
//# sourceMappingURL=store.js.map