import { NavLink } from "react-router-dom";
import { ReactComponent as Tomato } from '../../assets/tomato-svgrepo-com.svg';
import { useLocation } from "react-router-dom";

function NavBar() {

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <nav className="navbar">
      <Tomato className="navbar__icon"/>
      <ul className="navbar__list">
        <li className={`navbar__link ${splitLocation[1] === "" ? "navbar__link--active" : ""}`}>
          <NavLink exact className=""  to="/">Current Session</NavLink>
        </li>
        <li className={`navbar__link ${splitLocation[1] === "task-creator" ? "navbar__link--active" : ""}`}>
          <NavLink to="/task-creator">Task Creator</NavLink>
        </li>
        <li className={`navbar__link ${splitLocation[1] === "task-manager" ? "navbar__link--active" : ""}`}>
          <NavLink to="/task-manager">Task Manager</NavLink>
        </li>
        <li className={`navbar__link ${splitLocation[1] === "history" ? "navbar__link--active" : ""}`}>
          <NavLink to="/history">History</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
