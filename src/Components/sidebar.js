import { Link } from "react-router-dom";
import "../assets/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>School Management</h2>

      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/hod">HOD</Link>
        </li>
         <li>
          <Link to="/teachers">Teachers</Link>
        </li>
       
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/classes">Classes</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
