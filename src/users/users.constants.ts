export const USER_SEARCH_LIMIT = 10;

export const USER_ERROR_MESSAGES = {
    userNotFound: 'User not found',
    usersNotFound: 'Users not found',
    emailQueryParamRequired: 'Email query parameter is required',
} as const;

export const USER_SUCCESS_MESSAGES = {
    userRetrieved: 'User retrieved successfully',
    usersRetrieved: 'Users retrieved successfully',
} as const;