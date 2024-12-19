// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for routing
import UpdateForm from './UpdateForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5); // Items per page
  const navigate = useNavigate(); // To navigate to UpdateForm component

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users?page=${page}&size=${size}`);
      setUsers(response.data.content);
    } catch (error) {
      alert('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      fetchUsers(); // Refresh the list
      alert('User deleted');
    } catch (error) {
      alert('Error deleting user');
    }
  };

  const handleUpdate = (id) => {
    // Navigate to UpdateForm component with the user id as URL parameter
    navigate(`/update/${id}`);
  };

  return (
    <div>
      <h2>User List</h2>
      <Link to="/register">
        <button>Register New User</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.profession}</td>
              <td>
                <button onClick={() => handleUpdate(user.id)}>Update</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
