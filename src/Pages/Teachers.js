import React, { useEffect, useState } from "react";
import "../assets/Teachers.css";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    email:"",
    password:"",
    name: "",
    surname: "",
    gender: "",
    mobile: "",

    subject: "",
    date: "",
    experience: "",
    salary: "",
  });

  //get teachers data

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/getTeachers");

      console.log("API DATA:", response.data);

      setTeachers(response.data.data || response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //

  useEffect(() => {
    fetchTeachers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE TEACHER
  const addTeachers = async (e) => {
    e.preventDefault();

    try {
      if (
        !form.email ||
        !form.password ||
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
        await axios.put(`http://localhost:5000/api/user/updateTeachers/${editId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/user/addTeachers", form);
      }

      fetchTeachers();

      setForm({
        email: "",
        password: "",
        name: "",
        surname: "",
        gender: "",
        mobile: "",
        subject: "",
        date: "",
        experience: "",
        salary: "",
      });

      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteTeachers = async (user_id) => {
    const confirmDelete = window.confirm("Are You Sure?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/user/deleteTeachers/${user_id}`);
      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const editTeachers = (teacher) => {
    const { user_id, ...rest } = teacher;

    setForm(rest);
    setEditId(user_id);
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
              email: "",
              password: "",
              name: "",
              surname: "",
              gender: "",
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
              <label>Email</label>

              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
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
              <th>Email</th>
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
                <tr key={teacher.user_id}>
                  <td>{teacher.email}</td>
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

                    <button className="delete-btn" onClick={() => deleteTeachers(teacher.user_id)}>
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
