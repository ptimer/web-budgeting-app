// Local storage
export const fetchData = (key: string): string => {
    return JSON.parse(JSON.stringify(localStorage.getItem(key) || ''));
};