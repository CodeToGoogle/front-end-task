// src/components/UpdateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';

const UpdateForm = () => {
  const { id } = useParams(); // Get the id from the URL params
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    gender: '',
    password: '',
    profession: '',
    note: '',
    birthday: '',
    married: false,
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${id}`);
      setUser(response.data);
    } catch (error) {
      alert('Error fetching user details');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]); // 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/users/${id}`, user);
      alert('User updated successfully');
      navigate(`/`);
    } catch (error) {
      alert('Error updating user');
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={user.gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Profession:
          <input
            type="text"
            name="profession"
            value={user.profession}
            onChange={handleChange}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={user.birthday}
            onChange={handleChange}
          />
        </label>
        <label>
          Married:
          <input
            type="checkbox"
            name="married"
            checked={user.married}
            onChange={(e) => setUser({ ...user, married: e.target.checked })}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
