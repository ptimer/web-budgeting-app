// types
import { Budget, APP_DATA_KEYS } from "./types";

// Generate random color
const generateRandomColor = () => {
    const existingBudgetsLength = fetchData(APP_DATA_KEYS.budgets)?.length ?? 0;

    return `${existingBudgetsLength * 34} 65% 50%`;
}


// Local storage
export const fetchData = (key: string): string | null => {
    const item = localStorage.getItem(key);
    
    if (!item) return null;

    return JSON.parse(item);
};

// Create budget
export const createBudget = ({ name, amount }: Pick<Budget, 'name' | 'amount'>) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor(),
    };

    const existingBudgets = fetchData(APP_DATA_KEYS.budgets) ?? [];
    const newBudgets = JSON.stringify([...existingBudgets, newItem]);

    return localStorage.setItem(APP_DATA_KEYS.budgets, newBudgets);
}

// Delete item
interface DeleteItemProps {
    key: string;
}

export const deleteItem = ({ key }: DeleteItemProps) => {
    return localStorage.removeItem(key);
}