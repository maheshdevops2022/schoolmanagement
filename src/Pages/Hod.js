import React, { useEffect, useState } from "react";
import "../assets/Hod.css";
import axios from "axios";

const Hod = () => {
  const role = localStorage.getItem("role");
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
    department: "",
    designation: "",
    experience: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [hods, setHods] = useState([]);
  const [editId, setEditId] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch HODs
  const fetchHods = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/user/getHods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("HOD DATA:", response.data);

      setHods(response.data.data || []);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchHods();
  }, []);

  // Add HOD
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (
        !form.email ||
        !form.password ||
        !form.name ||
        !form.mobile ||
        !form.department ||
        !form.designation ||
        !form.experience
      ) {
        alert("Please fill all fields");
        return;
      }

      if (editId) {
        await axios.put(`http://localhost:5000/api/user/editHods/${editId}`, form, {
          headers: {
            Authorization: `Bearer${token}`,
          },
        });
      } else {
        await axios.post(
          "http://localhost:5000/api/user/addHods/",
          {
            email: form.email,
            password: form.password,
            name: form.name,
            mobile: form.mobile,
            department: form.department,
            designation: form.designation,

            experience: form.experience,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      //console.log("ADD RESPONSE:", response.data);

      alert("HOD Added Successfully");

      await fetchHods();

      setForm({
        email: "",
        password: "",
        name: "",
        mobile: "",
        department: "",
        designation: "",
        experience: "",
      });
      setEditId(hods.id);

      setShowForm(true);
    } catch (error) {
      console.log("Submit Error:", error);
      console.log("Full error", error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  //edit hod

  const editHods = (hod) => {
    setForm({
      email: hod.email || "",
      password: "",
      name: hod.name || "",
      mobile: hod.mobile || "",
      department: hod.department || "",
      designation: hod.designation || "",
      experience: hod.experience || "",
    });
    setEditId(null);
    setShowForm(true);
  };

  //deletehods

  const deleteHods = async (id) => {
    const confirmDelete = window.confirm("Are You Sure?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/user/deleteHods/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchHods();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="hod-container">
      {/* Header */}
      <div className="header-section">
        <h1 className="page-title">HOD Management</h1>

        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add HOD
        </button>
      </div>

      {/* Summary */}
      <div className="summary-card">
        <h3>Total HODs : {hods?.length || 0}</h3>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowForm(false)}>
              ✕
            </button>

            <h2>Add New HOD</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>

              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                />
              </div>

              <div className="mb-3">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </div>

              <div className="mb-3">
                <label>Department</label>
                <select
                  name="department"
                  className="form-control"
                  value={form.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Telugu">Telugu</option>
                  <option value="English">English</option>
                  <option value="English">Hindi</option>

                  <option value="Maths">Maths</option>
                  <option value="English">Enviromental Science</option>

                  <option value="Science">Physics</option>
                  <option value="English">Chemistry</option>
                  <option value="English">Biology</option>

                  <option value="Social">Social</option>
                  <option value="English">Computers</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Head Of Department"
                />
              </div>

              <div className="mb-3">
                <label>Experience</label>
                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Years"
                />
              </div>

              <button type="submit" className="submit-btn">
                {editId ? "edit hod" : "save hod"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-card">
        <h3>HOD List</h3>

        <table>
          <thead>
            <tr>
              <th>userId</th>
              <th>Email</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {hods?.length > 0 ? (
              hods.map((hod) => (
                <tr key={hod.id}>
                  <td>{hod.userId}</td>
                  <td>{hod.email}</td>

                  <td>{hod.name}</td>
                  <td>{hod.mobile}</td>
                  <td>{hod.department}</td>
                  <td>{hod.designation}</td>
                  <td>{hod.experience} Years</td>
                  <td>
                    <button onClick={() => editHods(hod)}>edit</button>
                    <button onClick={() => deleteHods(hod.id)}>delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-row">
                  No HODs Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hod;
