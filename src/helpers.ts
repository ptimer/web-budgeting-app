// Local storage
export const fetchData = (key: string): string => {
    return JSON.parse(JSON.stringify(localStorage.getItem(key) || ''));
};

// delete item
interface DeleteItemProps {
    key: string;
}

export const deleteItem = ({ key }: DeleteItemProps) => {
    return localStorage.removeItem(key);
}