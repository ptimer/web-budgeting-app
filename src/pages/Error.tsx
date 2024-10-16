// rrd
import { Link, useNavigate, useRouteError } from "react-router-dom";

// library
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/20/solid";

interface Error {
  message: string;
  statusText: string;
}

const Error = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  const handleNavigateBack = () => navigate(-1);

  return (
    <div className="error">
      <h1>Uh oh! We"ve got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={handleNavigateBack}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  )
}

export default Error