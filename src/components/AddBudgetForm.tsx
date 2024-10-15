import { useEffect, useRef } from "react";

// rrd
import { Form, useFetcher } from "react-router-dom";

// library
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef<any>();
    const focusRef = useRef<any>();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting]);

    const composeCreateBudgetButton = () => {
        return (
            <button 
                type="submit" 
                className="btn btn--dark" 
                disabled={isSubmitting}
            >
                { isSubmitting ? <span>Submitting budget...</span>
                : (
                    <>
                        <span>Create budget</span>
                        <CurrencyDollarIcon />
                    </>
                  )}
            </button>
        )
    }

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create budget
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input 
                        type="text" 
                        id="newBudget" 
                        name="newBudget"
                        placeholder="e.g., Groceries"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input 
                        type="number"
                        step="0.01" 
                        id="newBudgetAmount" 
                        name="newBudgetAmount"
                        placeholder="e.g., $350"
                        required
                        inputMode="decimal"
                    />
                </div>
                <input type="hidden" name="_action" value="createBudget" />
                { composeCreateBudgetButton() }
            </fetcher.Form>
        </div>
  )
}

export default AddBudgetForm