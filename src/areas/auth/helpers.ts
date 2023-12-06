/**
 * Lower and upper case letters, numbers, special chars and at least 8 symbols length.
 */
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
