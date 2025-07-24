export const validateDate = (date: string) => {
    return new Date(date) <= new Date() || 'Birth date cannot be in the future';
};
