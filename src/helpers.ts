// Local storage
export const fetchData = (key: string): string | null => {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(JSON.stringify(item));
};

// delete item
interface DeleteItemProps {
    key: string;
}

export const deleteItem = ({ key }: DeleteItemProps) => {
    return localStorage.removeItem(key);
}