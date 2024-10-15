// App Data
export interface Budget {
    id: string;
    name: string;
    amount: number;
    createdAt: Date;
    color: string;
};

export interface Expense {
    id: string;
    name: string;
    amount: number;
    createdAt: Date;
    budgetId: string;
};

export enum APP_DATA_KEYS {
    userName = "userName",
    budgets = "budgets",
    expenses = "expenses",
}

export interface AppData {
    userName: string | null;
    budgets: Budget[];
    expenses: Expense[];
};

// Site Config
export interface SiteConfigType {
    companyName: string;
}
