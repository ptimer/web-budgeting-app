// rrd
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { fetchData } from "@/helpers";

// components
import Intro from '@/components/Intro';

// loader
interface DashboardData {
  userName: string | null;
}

export function dashboardLoader() {
    const userName = fetchData('userName');

    return { userName };
}

// action
export async function dashboardAction({ request }: any) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  
  try {
    localStorage.setItem('userName', JSON.stringify(formData.userName));
    return toast.success(`Welcome, ${formData.userName}`);
  } catch (e) {
    throw new Error('There was a problem creating your account.');
  }
}

const Dashboard = () => {
  const { userName } = useLoaderData() as DashboardData;
  console.log(userName)

  return (
    <>{ userName ? (<p>{userName}</p>) : <Intro />}</>
  )
}

export default Dashboard;
