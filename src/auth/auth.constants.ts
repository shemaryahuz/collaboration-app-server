export const AUTH_CONTROLLER_ROUTE = 'auth';
export const AUTH_TOKEN_COOKIE_NAME = 'token';
export const AUTH_TOKEN_COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24;

export const AUTH_JWT_DEFAULT_SECRET = 'fallback_secret_key';
export const AUTH_JWT_DEFAULT_EXPIRES_IN = '1d';

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
} as const;

export const AUTH_SUCCESS_MESSAGES = {
    signup: 'Signup successful',
    login: 'Login successful',
} as const;
