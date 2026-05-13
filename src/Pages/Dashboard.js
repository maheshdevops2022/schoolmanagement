import React from "react";


import "../assets/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="main-content">
      <h3 className="title">Welcome to Admin</h3>

      <div className="cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Total Teachers</h3>
          <p>20</p>
        </div>

        <div className="card">
          <h3>Total Classes</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
