import React, { useState } from "react";
import "../assets/Classes.css";

const Classes = () => {
  const [form, setForm] = useState({
    className: "",
    teacher: "",
    boys: "",
    girls: "",
  });

  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addClass = (e) => {
    e.preventDefault();

    if (!form.className || !form.teacher || !form.boys || !form.girls) {
      alert("Please fill all fields");
      return;
    }

    const totalStudents =
      Number(form.boys) + Number(form.girls);

    const newClass = {
      id: Date.now(),
      ...form,
      totalStudents,
    };

    setClasses([newClass, ...classes]);

    setForm({
      className: "",
      teacher: "",
      boys: "",
      girls: "",
    });

    setShowForm(false);
  };

  return (
    <div className="classes-page">

      {/* TOP BAR */}
      <div className="classes-topbar">
        <h2>🏫 Classes Dashboard</h2>

        <button
          className="classes-add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Class
        </button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="classes-modal-overlay">
          <div className="classes-modal">

            <button
              className="classes-close"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            <h3>Add New Class</h3>

            <form onSubmit={addClass} className="classes-form">

              <input
                name="className"
                placeholder="Class Name"
                value={form.className}
                onChange={handleChange}
              />

              <input
                name="teacher"
                placeholder="Teacher Name"
                value={form.teacher}
                onChange={handleChange}
              />

              <div className="classes-row">
                <input
                  name="boys"
                  type="number"
                  placeholder="Boys"
                  value={form.boys}
                  onChange={handleChange}
                />

                <input
                  name="girls"
                  type="number"
                  placeholder="Girls"
                  value={form.girls}
                  onChange={handleChange}
                />
              </div>

              <button className="classes-save-btn">
                Save Class
              </button>

            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="classes-table-card">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Teacher</th>
              <th>Boys</th>
              <th>Girls</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {classes.length > 0 ? (
              classes.map((item) => (
                <tr key={item.id}>
                  <td>{item.className}</td>
                  <td>{item.teacher}</td>
                  <td>{item.boys}</td>
                  <td>{item.girls}</td>
                  <td>
                    <span className="badge">
                      {item.totalStudents}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No Classes Added Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Classes;