// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [note, setNote] = useState('');
  const [birthday, setBirthday] = useState('');
  const [married, setMarried] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      gender,
      password,
      profession,
      note,
      birthday,
      married,
    };

    try {
      await axios.post('http://localhost:8080/users', newUser);
      alert('User registered successfully!');
      navigate('/'); // Redirect to the user list after successful registration
    } catch (error) {
      alert('Error creating user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="text"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder="Profession"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note"
      />
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={married}
          onChange={(e) => setMarried(e.target.checked)}
        />
        Married
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default UserForm;
