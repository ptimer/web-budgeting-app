// rrd
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem, getAllMatchingItems } from "@/common/helpers";

// types
import { Expense } from "@/common/types";

export const deleteBudgetAction = ({ params }: any) => {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        });

        const budgetExpenses: Expense[] = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        });

        budgetExpenses.forEach(expense => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            });
        });

        toast.success("Budget deleted successfully!");
    } catch (e) {
        throw new Error("There was a problem deleting your budget.");
    }

    return redirect("/");
}