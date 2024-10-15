// App Data
export interface Budget {
    id: string;
    name: string;
    amount: number;
    createdAt: Date;
    color: string;
};

export enum APP_DATA_KEYS {
    userName = "userName",
    budgets = "budgets"
}

export interface AppData {
    userName: string | null;
    budgets: Budget[];
};

// Site Config
export interface SiteConfigType {
    companyName: string;
}

// 