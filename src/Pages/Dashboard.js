import React, { useEffect, useState } from "react";

import "../assets/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
  });


  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/getDashboard");
      setDashboard(response.data.data)
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  return (
    <div className="main-content">
      <h3 className="title">Welcome to Admin</h3>

      <div className="cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>{dashboard.totalStudents}</p>
        </div>

        <div className="card">
          <h3>Total Teachers</h3>
          <p>{dashboard.totalTeachers}</p>
        </div>

        <div className="card">
          <h3>Total Classes</h3>
          <p>{dashboard.totalClasses}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
