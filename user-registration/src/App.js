// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UpdateForm from './components/UpdateForm';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>User Management</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/register" element={<UserForm />} />
          <Route path="/update/:id" element={<UpdateForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
