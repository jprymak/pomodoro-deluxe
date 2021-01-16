import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="w-full bg-red-400 mb-20">
      <ul className="flex justify-around">
        <li>
          <Link to="/">Current Session</Link>
        </li>
        <li>
          <Link to="/task-creator">Task Creator</Link>
        </li>
        <li>
          <Link to="/task-manager">Task Manager</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
