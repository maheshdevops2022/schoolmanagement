import React, { useEffect, useState } from "react";
import "../assets/Teachers.css";
import axios from "axios";

const Teachers = () => {
  const role = localStorage.getItem("role");

  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
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

  // FETCH TEACHERS

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/user/getTeachers?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API DATA:", response.data);

      setTeachers(response.data.data || response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [page, search]);

  //upload csv

  const uploadTeachers = async () => {
    if (!file) {
      alert("Please Upload Csv");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/user/uploadTeachers", formData);

      console.log(response.data);

      await fetchTeachers();

      alert("csv file uploaded");
    } catch (error) {
      console.log(error);
      alert("Failed to upload");
    }
  };

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
      const token = localStorage.getItem("token");

      // VALIDATION

      if (
        !form.email ||
        (!editId && !form.password) ||
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

      // UPDATE

      if (editId) {
        await axios.put(`http://localhost:5000/api/user/editTeachers/${editId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await fetchTeachers();

        alert("Teacher Updated");
      }

      // ADD
      else {
        await axios.post("http://localhost:5000/api/user/addTeachers", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Teacher Added");
      }

      fetchTeachers();

      // RESET FORM

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
      console.log(error.response?.data || error.message);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // DELETE

  const deleteTeachers = async (id) => {
    const confirmDelete = window.confirm("Are You Sure?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/user/deleteTeachers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Teacher Deleted");

      fetchTeachers();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // EDIT

  // const editTeachers = (teacher) => {
  //   const { id, ...rest } = teacher;

  //   setForm({
  //     ...rest,
  //     password: "",
  //   });

  //   setEditId(id);

  //   setShowForm(true);
  // };

  const editTeachers = (teacher) => {
    const { id, ...rest } = teacher;

    setForm({
      ...rest,
      date: teacher.date ? new Date(teacher.date).toISOString().split("T")[0] : "",
      password: "",
    });

    setEditId(id);
    setShowForm(true);
  };

  //filterstudents

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name?.toLowerCase().includes(search.toLowerCase()) ||
      teacher.email?.toLowerCase().includes(search.toLowerCase()) ||
      teacher.mobile?.includes(search)
  );

  return (
    <div className="main-content">
      {/* HEADER */}

      <div className="header">
        <h1>👨‍🏫 Teachers</h1>
        <input
          type="text"
          placeholder="search by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {role === "admin" && (
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
        )}
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
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={uploadTeachers}>Upload Teachers CSV</button>

          <form className="teacher-form" onSubmit={addTeachers}>
            {/* EMAIL */}

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>

            {/* PASSWORD */}

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>

            {/* NAME */}

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

            {/* SURNAME */}

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

            {/* GENDER */}

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

            {/* MOBILE */}

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

            {/* SUBJECT */}

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

            {/* DATE */}

            <div className="form-group">
              <label>Date Of Joining</label>

              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>

            {/* EXPERIENCE */}

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

            {/* SALARY */}

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
              <th>UserId</th>
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
              filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.userId}</td>
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
                    {role === "admin" && (
                      <>
                        <button className="edit-btn" onClick={() => editTeachers(teacher)}>
                          ✏️ Edit
                        </button>

                        <button className="delete-btn" onClick={() => deleteTeachers(teacher.id)}>
                          ❌ Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-data">
                  No teachers added
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>Pages {page}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
