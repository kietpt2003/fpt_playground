export const validateUsername = (username: string): boolean => {
    const regex = /^(?=.*[a-z])[a-z0-9_]{1,25}$/;
    return regex.test(username);
};
