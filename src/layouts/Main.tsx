// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from '@/assets/wave.svg';

// helper functions
import { fetchData } from "@/helpers"

// components
import Nav from '@/components/Nav';


// loader
interface MainData {
    userName: string | null;
}

export function mainLoader() {
    const userName = fetchData('userName');

    return { userName };
}

const Main = () => {
  const { userName } = useLoaderData() as MainData;

  return (
    <div className='layout'>
        <Nav {...{ userName }} />
        <main>
            <Outlet />
        </main>
        <img src={wave} alt='wave' />
    </div>
  )
}

export default Main;
