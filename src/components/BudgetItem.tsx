import { CSSProperties } from "react";

// helpers
import { formatCurrency, formatPercentage, totalSpentByBudget } from "@/common/helpers";

// types
import { Budget } from "@/common/types"

interface Props {
    budget: Budget
}

const BudgetItem = ({ budget }: Props) => {
    const { id, name, amount, color } = budget;

    const spent = totalSpentByBudget(id);

    const composeBudgetItemStyle = () => {
        const style = {
            "--accent": color
        };

        return style as CSSProperties & { [key: string]: string }
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
        </div>
    )
}

export default BudgetItem