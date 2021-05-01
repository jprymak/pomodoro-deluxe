import { Link } from "react-router-dom";
import { ReactComponent as Tomato } from '../../assets/tomato-svgrepo-com.svg';

function NavBar() {
  return (
    <nav className="navbar">
      <Tomato className="navbar__icon"/>
      <ul className="navbar__list">
        <li>
          <Link to="/">Current Session</Link>
        </li>
        <li>
          <Link to="/task-creator">Task Creator</Link>
        </li>
        <li>
          <Link to="/task-manager">Task Manager</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
