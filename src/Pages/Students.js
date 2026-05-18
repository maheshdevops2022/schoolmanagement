import React, { useEffect, useState } from "react";
import "../assets/Students.css";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    fathersname: "",
    class: "",
    mobile: "",
    village: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //get students
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/getStudents");
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //
  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudents =  async (e) => {
    e.preventDefault();
    try {

    if (
      !form.name ||
      !form.surname ||
      !form.fathersname ||
      !form.class ||
      !form.mobile ||
      !form.village ||
      !form.gender
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:5000/api/user/updateStudents/${editId}`, form)
    } else {
      // edit ayindhi add avudhi

      await axios.post("http://localhost:5000/api/user/addStudents", form)

    }

    //tableUpdate avudhi

    fetchStudents();
    setForm({
      name: "",
      surname: "",
      fathersname: "",
      class: "",
      mobile: "",
      village: "",
      gender: "",

    });
    setEditId(null);
    setShowForm(false);
  } catch (error) {
    console.log(error);
  }

  };

  const deleteStudents =  async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/user/deleteStudents/${id}`);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }

  };

  const editStudents = (student) => {
    const { id, ...rest } = student; // ✅ remove id
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  return (
    <div className="main-content">
      <div className="header">
        <h1>🎓 Students</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Student
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <h3>{editId ? "Edit Student" : "Add Student"}</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              ✖
            </button>
          </div>
          <form className="student-form" onSubmit={addStudents}>
            <div className="input-group">
              <label>Student Name</label>
              <input
                name="name"
                placeholder="First Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Surname</label>
              <input
                name="surname"
                placeholder="Surname"
                value={form.surname}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Father Name</label>
              <input
                name="fathersname"
                placeholder="Father Name"
                value={form.fathersname}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Class</label>
              <input name="class" placeholder="Class" value={form.class} onChange={handleChange} />
            </div>

            <div className="input-group">
              <label>Mobile Number</label>
              <input
                name="mobile"
                type="text"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Village</label>
              <input
                name="village"
                placeholder="Village"
                value={form.village}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <input
                name="gender"
                placeholder="Gender"
                value={form.gender}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              {editId ? "Update Student" : "Save Student"}
            </button>
          </form>
        </div>
      )}

      <div className="table-card">
        <h3>📋 Students List</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Father</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Village</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.surname}</td>
                  <td>{student.fathersname}</td>
                  <td>{student.class}</td>
                  <td>{student.gender}</td>
                  <td>{student.mobile}</td>
                  <td>{student.village}</td>
                  <td>
                    <button className="edit-btn" onClick={() => editStudents(student)}>
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteStudents(student.id)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No students yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
