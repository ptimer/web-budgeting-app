import { fetchData } from "@/helpers"
import { useLoaderData } from "react-router-dom";

interface DashboardData {
  userName: string | null;
}

export function dashboardLoader() {
    const userName = fetchData('userName');

    return { userName };
}

const Dashboard = () => {
  const { userName } = useLoaderData() as DashboardData;

  return (
    <div>{ userName }</div>
  )
}

export default Dashboard;
