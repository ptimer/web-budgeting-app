const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;

    return `${existingBudgetsLength * 34} 65% 50%`;
}


// Local storage
export const fetchData = (key: string): string | null => {
    const item = localStorage.getItem(key);
    
    if (!item) return null;

    return JSON.parse(item);
};

// create budget
interface Budget {
    id: string;
    name: string;
    amount: number;
    createdAt: Date;
    color: string;
}

export const createBudget = ({ name, amount }: Pick<Budget, 'name' | 'amount'>) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor(),
    };

    const existingBudgets = fetchData("budgets") ?? [];
    const newBudgets = JSON.stringify([...existingBudgets, newItem]);

    return localStorage.setItem("budgets", newBudgets);
}

// delete item
interface DeleteItemProps {
    key: string;
}

export const deleteItem = ({ key }: DeleteItemProps) => {
    return localStorage.removeItem(key);
}