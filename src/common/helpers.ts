// types
import { Budget, Expense, APP_DATA_KEYS } from "./types";

// Wait
export const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

// Generate random color
const generateRandomColor = () => {
    const existingBudgetsLength = fetchData<Budget[]>(APP_DATA_KEYS.budgets, []).length ?? 0;

    return `${existingBudgetsLength * 34} 65% 50%`;
}


// Local storage
export const fetchData = <T>(key: string, defaultValue: T): T => {
    const item = localStorage.getItem(key);
    
    if (!item) return defaultValue;

    try {
        return JSON.parse(item) as T;
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        return defaultValue;
    }
};

// Get all items from local storage
interface GetAllMatchingItemsArgs {
    category: string,
    key: string,
    value: string,
}

export const getAllMatchingItems = ({ category, key, value }: GetAllMatchingItemsArgs) => {
    const data = fetchData<any>(category, []);
    
    return data.filter((item: any) => item[key] === value);
}

// Create budget
export const createBudget = ({ name, amount }: Pick<Budget, "name" | "amount">) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        amount: +amount,
        createdAt: Date.now(),
        color: generateRandomColor(),
    };

    const existingBudgets = fetchData<Budget[]>(APP_DATA_KEYS.budgets, []);
    const newBudgets = JSON.stringify([...existingBudgets, newItem]);

    return localStorage.setItem(APP_DATA_KEYS.budgets, newBudgets);
}

// Create expense
export const createExpense = ({ name, amount, budgetId }: Pick<Expense, "name" | "amount" | "budgetId">) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        amount: +amount,
        createdAt: Date.now(),
        budgetId: budgetId,
    };

    const existingExpenses = fetchData<Expense[]>(APP_DATA_KEYS.expenses, []);
    const newExpenses = JSON.stringify([...existingExpenses, newItem]);

    return localStorage.setItem(APP_DATA_KEYS.expenses, newExpenses);
}

// Delete item
interface DeleteItemProps {
    key: string;
}

export const deleteItem = ({ key }: DeleteItemProps) => {
    return localStorage.removeItem(key);
}

// total spent by budget
export const totalSpentByBudget = (budgetId: string) => {
    const expenses = fetchData<Expense[]>(APP_DATA_KEYS.expenses, []);

    const budgetSpent = expenses.reduce((totalAmount: number, expense: Expense) => {
        if (expense.budgetId !== budgetId) return totalAmount;
        
        return totalAmount += expense.amount;
    }, 0);

    return budgetSpent;
};

// FORMATTING

// formating date
export const formatDateToLocaleString = (epoch: number | string | Date) => {
    return new Date(epoch).toLocaleDateString();
};

// formating percentages
export const formatPercentage = (amount: number) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}

// Format currency
export const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
    });
} 