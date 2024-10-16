// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "@/common/helpers";

export const logoutAction = async () => {
    deleteItem({
        key: "userName",
    });

    deleteItem({
        key: "budgets",
    });

    deleteItem({
        key: "expenses",
    });

    toast.success("you've deleted your account!");

    return redirect("/");
}