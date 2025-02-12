export const handleValidEmail = (mail: string) => {
    return /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/.test(mail);
};