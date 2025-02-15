export const validateName = (name: string): boolean => {
    const regex = /^[\p{L} ]{1,25}$/u;
    return regex.test(name.trim());
};