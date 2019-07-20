/**
 * Check if password is the same
 * @param password { string }
 * @param password2 { string }
 * @return {boolean}
 */
exports.checkPassword = (password, password2) => {
    // Check if password is the same
    if (!password || !password2) return false
    return password === password2
}

/**
 * Check password length
 * @param password {string}
 * @return {boolean}
 */
exports.passwordIsGreaterThan6 = (password) => {
    // Check if password is the same
    if (!password) return false
    return password.length >= 6
}

/**
 * Check all form
 * @param credentials {object}
 * @return {boolean}
 */
exports.validationInput = (credentials) => {
    if (!passwordIsGreaterThan6(credentials.pwd)) {
        this.setMsgNotification(NOTIF_MSG.PWD_TOO_SHORT)
        return false
    }
    if (checkPassword(credentials.pwd, credentials.pwd2)) {
        this.setMsgNotification(NOTIF_MSG.NOT_SAME_PWD)
        return false
    }
    return true
}