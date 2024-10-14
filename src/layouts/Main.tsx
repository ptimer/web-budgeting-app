// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";
// assets
import wave from '@/assets/wave.svg';
// helper functions
import { fetchData } from "@/helpers"

// loader
interface MainData {
    userName: string;
}

export function mainLoader() {
    const userName = fetchData('userName');

    return { userName };
}

const Main = () => {
  const { userName } = useLoaderData() as MainData;

  return (
    <div className='layout'>
        <main>
            <Outlet />
        </main>
        <img src={wave} alt='wave' />
    </div>
  )
}

export default Main;
