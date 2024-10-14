// rrd imports
import { redirect } from 'react-router-dom';

// helpers
import { deleteItem } from '@/helpers';

export const logoutAction = async () => {
    deleteItem({
        key: 'userName',
    });

    return redirect('/');
}