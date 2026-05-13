import React, { useState } from "react";
import "../assets/Teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    mobile: "",
    gender:"",
    subject: "",
    date: "",
    experience: "",
    salary: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE TEACHER
  const addTeachers = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.surname ||
      !form.gender ||
      !form.mobile ||
      !form.subject ||
      !form.date ||
      !form.experience ||
      !form.salary
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      // UPDATE
      const updatedTeachers = teachers.map((teacher) =>
        teacher.id === editId ? { ...form, id: editId } : teacher
      );

      setTeachers(updatedTeachers);
      setEditId(null);
    } else {
      // ADD
      const newTeacher = {
        id: Date.now(),
        ...form,
      };

      setTeachers([...teachers, newTeacher]);
    }

    // RESET FORM
    setForm({
      name: "",
      surname: "",
      gender:"",
      mobile: "",
      subject: "",
      date: "",
      experience: "",
      salary: "",
    });

    setShowForm(false);
  };

  // DELETE
  const deleteTeachers = (id) => {
    const confirmDelete = window.confirm("Are You Sure?");
    if (!confirmDelete) return;
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  // EDIT
  const editTeachers = (teacher) => {
    const { id, ...rest } = teacher;

    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  return (
    <div className="main-content">
      {/* HEADER */}
      <div className="header">
        <h1>👨‍🏫 Teachers</h1>

        <button
          className="add-btn"
          onClick={() => {
            setShowForm(true);
            setEditId(null);

            setForm({
              name: "",
              surname: "",
              gender:"",
              mobile: "",
              subject: "",
              date: "",
              experience: "",
              salary: "",
            });
          }}
        >
          + Add Teacher
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <h3>{editId ? "Edit Teacher" : "Add Teacher"}</h3>

            <button type="button" className="close-btn" onClick={() => setShowForm(false)}>
              ✖
            </button>
          </div>

          <form className="teacher-form" onSubmit={addTeachers}>
            <div className="form-group">
              <label>Teacher Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter teacher name"
              />
            </div>

            <div className="form-group">
              <label>Surname</label>
              <input
                type="text"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                placeholder="Enter surname"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                placeholder="Enter Gender"
              />
            </div>


            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter subject"
              />
            </div>

            <div className="form-group">
              <label>Date Of Joining</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                placeholder="Years of experience"
              />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="Enter salary"
              />
            </div>

            <button className="submit-btn" type="submit">
              {editId ? "Update Teacher" : "Save Teacher"}
            </button>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="table-card">
        <h3 className="table-title">📋 Teachers List</h3>

        <table className="teacher-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Subject</th>
              <th>Date Of Joining</th>
              <th>Experience</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.surname}</td>
                  <td>{teacher.gender}</td>
                  <td>{teacher.mobile}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.date}</td>
                  <td>{teacher.experience}</td>
                  <td>{teacher.salary}</td>

                  <td>
                    <button className="edit-btn" onClick={() => editTeachers(teacher)}>
                      ✏️ Edit
                    </button>

                    <button className="delete-btn" onClick={() => deleteTeachers(teacher.id)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No teachers added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
