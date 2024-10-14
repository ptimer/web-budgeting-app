// rrd imports
import { redirect } from 'react-router-dom';

// library
import { toast } from 'react-toastify';

// helpers
import { deleteItem } from '@/helpers';

export const logoutAction = async () => {
    deleteItem({
        key: 'userName',
    });

    toast.success("you've deleted your account!");

    return redirect('/');
}