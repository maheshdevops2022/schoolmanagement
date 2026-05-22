import React, { useEffect, useState } from "react";
import "../assets/Classes.css";
import axios from "axios";

const Classes = () => {
  const [form, setForm] = useState({
    className: "",
    teacher: "",
    boys: "",
    girls: "",
  });

  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // GET CLASSES

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/user/getClasses", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClasses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // ADD / UPDATE CLASS

  const addClass = async (e) => {
    e.preventDefault();

    try {
      if (!form.className || !form.teacher || !form.boys || !form.girls) {
        alert("Please fill all fields");
        return;
      }

      if (editId) {
        await axios.put(`http://localhost:5000/api/user/editClasses/${editId}`, form);
        alert("class updated");
      } else {
        await axios.post("http://localhost:5000/api/user/addClasses", form);
        alert("class Added");
      }

      fetchClasses();

      setForm({
        className: "",
        teacher: "",
        boys: "",
        girls: "",
      });

      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert(error.respose?.data?.message || "class already exists");
    }
  };

  // EDIT

  const editClasses = (item) => {
    const { id, ...rest } = item;

    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  // DELETE

  const deleteClasses = async (id) => {
    const confirmDelete = window.confirm("Are You Sure ?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/user/deleteClasses/${id}`);

      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="classes-page">
      <div className="classes-topbar">
        <h2>🏫 Classes Dashboard</h2>

        <button className="classes-add-btn" onClick={() => setShowForm(true)}>
          + Add Class
        </button>
      </div>

      {showForm && (
        <div className="classes-modal-overlay">
          <div className="classes-modal">
            <button className="classes-close" onClick={() => setShowForm(false)}>
              ✕
            </button>

            <h3>{editId ? "Update Class" : "Add New Class"}</h3>

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

              <button className="classes-save-btn">{editId ? "Update Class" : "Save Class"}</button>
            </form>
          </div>
        </div>
      )}

      <div className="classes-table-card">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Teacher</th>
              <th>Boys</th>
              <th>Girls</th>
              <th>Total</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {classes.length > 0 ? (
              classes.map((item) => (
                <tr key={item.id}>
                  <td>{item.class_name}</td>
                  <td>{item.teacher}</td>
                  <td>{item.boys}</td>
                  <td>{item.girls}</td>

                  <td>
                    <span className="badge">{Number(item.boys) + Number(item.girls)}</span>
                  </td>

                  <td>
                    <button className="edit-btn" onClick={() => editClasses(item)}>
                      Edit
                    </button>
                  </td>

                  <td>
                    <button className="delete-btn" onClick={() => deleteClasses(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
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
