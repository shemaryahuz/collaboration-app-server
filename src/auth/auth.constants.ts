export const TOKEN_COOKIE_NAME = 'token';
export const TOKEN_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;

export const JWT_DEFAULT_SECRET = 'fallback_secret_key';
export const JWT_DEFAULT_EXPIRES_IN = '1d';

export const AUTH_VALIDATION_MESSAGES = {
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    invalidEmail: 'Invalid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters long',
} as const;

export const AUTH_ERROR_MESSAGES = {
    emailExists: 'Email already exists',
    invalidCredentials: 'Invalid email or password',
    noToken: 'No token found in cookies',
    invalidToken: 'Invalid token',
} as const;

export const AUTH_SUCCESS_MESSAGES = {
    signup: 'Signup successful',
    login: 'Login successful',
    logout: 'Logout successful',
} as const;
