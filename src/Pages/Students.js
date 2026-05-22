import React, { useEffect, useState } from "react";
import "../assets/Students.css";
import axios from "axios";

const Students = () => {
  const role = localStorage.getItem("role");

  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    fathersname: "",
    studentsClass: "",
    mobile: "",
    village: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= GET STUDENTS =================
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/user/getStudents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(response.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ================= ADD / UPDATE =================
  const addStudents = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (
        !form.email ||
        !form.password ||
        !form.name ||
        !form.surname ||
        !form.fathersname ||
        !form.studentsClass ||
        !form.mobile ||
        !form.village ||
        !form.gender
      ) {
        alert("Please fill all fields");
        return;
      }

      if (editId) {
        // UPDATE
        await axios.put(`http://localhost:5000/api/user/updateStudents/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // ADD
        await axios.post(
          "http://localhost:5000/api/user/addStudents",
          {
            email: form.email,
            password: form.password,
            name: form.name,
            surname: form.surname,
            fathersname: form.fathersname,
            studentsClass: form.studentsClass,
            mobile: form.mobile,
            village: form.village,
            gender: form.gender,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      fetchStudents();

      setForm({
        email: "",
        password: "",
        name: "",
        surname: "",
        fathersname: "",
        studentsClass: "",
        mobile: "",
        village: "",
        gender: "",
      });

      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= DELETE =================
  const deleteStudents = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/user/deleteStudents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchStudents();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ================= EDIT =================
  const editStudents = (student) => {
    setForm({
      email: student.email || "",
      password: "",
      name: student.name || "",
      surname: student.surname || "",
      fathersname: student.fathersname || "",
      studentsClass: student.studentsClass || "",
      mobile: student.mobile || "",
      village: student.village || "",
      gender: student.gender || "",
    });

    setEditId(student.id);
    setShowForm(true);
  };

  return (
    <div className="main-content">
      {/* HEADER */}
      <div className="header">
        <h1>🎓 Students</h1>

        {(role === "admin" || role === "teacher") && (
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
                fathersname: "",
                studentsClass: "",
                mobile: "",
                village: "",
                gender: "",
              });
            }}
          >
            + Add Student
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <h3>{editId ? "Edit Student" : "Add Student"}</h3>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              ✖
            </button>
          </div>

          <form className="student-form" onSubmit={addStudents}>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input
              name="surname"
              placeholder="Surname"
              value={form.surname}
              onChange={handleChange}
            />
            <input
              name="fathersname"
              placeholder="Father Name"
              value={form.fathersname}
              onChange={handleChange}
            />

            <input
              name="studentsClass"
              placeholder="Class"
              value={form.studentsClass}
              onChange={handleChange}
            />

            <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
            <input
              name="village"
              placeholder="Village"
              value={form.village}
              onChange={handleChange}
            />
            <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />

            <button type="submit">{editId ? "Update Student" : "Save Student"}</button>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="table-card">
        <h3>📋 Students List</h3>

        <table>
          <thead>
            <tr>
              <th>UserId</th>
              <th>Email</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Father</th>
              <th>Student Class</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Village</th>
              {(role === "admin" || role === "teacher") && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.userId}</td>
                  <td>{student.email}</td>
                  <td>{student.name}</td>
                  <td>{student.surname}</td>
                  <td>{student.fathersname}</td>
                  <td>{student.studentsClass}</td>
                  <td>{student.gender}</td>
                  <td>{student.mobile}</td>
                  <td>{student.village}</td>

                  <td>
                    {(role === "admin" || role === "teacher") && (
                      <>
                        <button onClick={() => editStudents(student)}>✏️</button>
                        <button onClick={() => deleteStudents(student.id)}>❌</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No students yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
