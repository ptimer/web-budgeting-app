import { CSSProperties } from "react";

// rrd
import { Form, Link } from "react-router-dom";

// library
import { BanknotesIcon, TrashIcon } from "@heroicons/react/20/solid";

// helpers
import { formatCurrency, formatPercentage, totalSpentByBudget } from "@/common/helpers";

// types
import { Budget } from "@/common/types"

interface Props {
    budget: Budget;
    showDelete?: boolean;
}

const BudgetItem = ({ budget, showDelete = false }: Props) => {
    const { id, name, amount, color } = budget;

    const spent = totalSpentByBudget(id);

    const composeBudgetItemStyle = () => {
        const style = {
            "--accent": color
        };

        return style as CSSProperties & { [key: string]: string }
    }

    const handleDeleteBudget = (event: any) => {
        const confirmResult = confirm("Are you sure you want to permanently delete this budget?");
        
        if (!confirmResult) {
            event.preventDefault();
        }
    }

    return (
        <div className="budget" style={composeBudgetItemStyle()}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            { showDelete ? (
                <div className="flex-sm">
                    <Form 
                        method="post"
                        action="delete"
                        onSubmit={handleDeleteBudget}
                    >
                        <button type="submit" className="btn">
                            <span>Delete Budget</span>
                            <TrashIcon width={20} />
                        </button>
                    </Form>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link
                        to={`/budget/${id}`}
                        className="btn"
                    >
                        <span>View Details</span>
                        <BanknotesIcon width={20} />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default BudgetItem