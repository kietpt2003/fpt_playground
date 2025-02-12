export const handleValidPassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>_\-]{8,15}$/.test(password);
};
