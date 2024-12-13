import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Orders from './Components/Order';
import DeliveryBoys from './Components/DeliveryBoys';
import AddNumbers from './stringCalculator';
import './App.css';
import { Button } from 'react-bootstrap';
import Login from './Components/Login';
import Signin from './Components/Signin';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<Dashboard /> }
          />
          <Route
            path="/orders"
            element={<Orders /> }
          />
          <Route
            path="/deliveryboys"
            element={ <DeliveryBoys /> }
          />
          <Route
            path="/stringCalculator"
            element={ <AddNumbers />}
          />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
