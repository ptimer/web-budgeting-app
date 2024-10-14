// Local storage
export const fetchData = (key: string): string | null => {
    return JSON.parse(localStorage.getItem(key)+'');
};