import { CSSProperties } from "react";

// rrd
import { useLoaderData } from "react-router-dom";

// types
import { Budget, Expense } from "@/common/types";

// helpers
import { createExpense, deleteItem, getAllMatchingItems, wait } from "@/common/helpers";

// components
import BudgetItem from "@/components/BudgetItem";
import AddExpenseForm from "@/components/AddExpenseForm";
import Table from "@/components/Table";

// library
import { toast } from "react-toastify";

// loader
interface BudgetLoaderResult {
    budget: Budget;
    expenses: Expense[];
}

export async function budgetLoader({ params }: any): Promise<BudgetLoaderResult> {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if (!budget) {
        throw new Error("The budget you're trying to find doesn't exist");
    }

    return { budget, expenses };
};

// action
export async function budgetAction({ request }: any) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "createExpense") {
        await wait(100);
    
        try {
          createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget,
          });
    
          return toast.success(`Expense ${values.newExpense} created!`);
        } catch (e: any) {
          throw new Error("There was a problem creating your expense.");
        }
    };
  
    if (_action === "deleteExpense") {
      await wait(300);
  
      try {
        deleteItem({
          key: "expenses",
          id: values.expenseId,
        });
  
        return toast.success("Expense deleted!");
      } catch (e: any) {
        throw new Error("There was a problem deleting your expense.");
      }
    };
  }

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData() as BudgetLoaderResult;
    
    const composeExpenseItemStyle = () => {
        const style = {
            "--accent": budget.color
        };
    
        return style as CSSProperties & { [key: string]: string }
    }

    return (
        <div 
            className="grid-lg"
            style={composeExpenseItemStyle()}
        >
            <h1 className="h2">
                <span className="accent">{budget.name}</span>{" "}
                Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {
                expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span>{" "}
                            Expenses
                        </h2>
                        <Table expenses={expenses} showBudget={false} />
                    </div>
                )
            }
        </div>
    )
}

export default BudgetPage