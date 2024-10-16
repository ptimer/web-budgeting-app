// rrd imports
import { Form, NavLink } from "react-router-dom";

// library
import { TrashIcon } from "@heroicons/react/20/solid";

// assets
import logomark from "@/assets/logomark.svg";

// constants
import { SiteConfig } from "@/common/constants";

interface Props {
  userName: string | null;
}

const Nav = ({ userName }: Props) => {
  const handleDeleteUser = (event: React.FormEvent<HTMLFormElement>) => {
    const confirmation = confirm("Delete user and all data?");

    if (!confirmation) event.preventDefault();
  }

  return (
    <nav>
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="Go to home" height={30} />
        <span>{ SiteConfig.companyName }</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={handleDeleteUser}
          >
            <button
              type="submit"
              className="btn btn--warning"
            >
              <span>Delete user</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )
      }
    </nav>
  )
}

export default Nav