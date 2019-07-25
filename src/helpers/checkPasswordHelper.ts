/**
 * Check if password is the same
 * @param password { string }
 * @param password2 { string }
 * @return {boolean}
 */
export const checkPassword = (password: string, password2: string): boolean => {
    // Check if password is the same
    if (!password || !password2) return false
    return password === password2
}

/**
 * Check password length
 * @param password {string}
 * @return {boolean}
 */
export const passwordIsGreaterThan6 = (password: string): boolean => {
    // Check if password is the same
    if (!password) return false
    return password.length >= 6
}
