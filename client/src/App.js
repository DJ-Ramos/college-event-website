
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
import Navbar from "./components/Navbar";

import RSO from "./components/RSO"; 
import Events from "./components/Events"; 

import "bootstrap/dist/css/bootstrap.min.css";

const UserName = () => {
  const [userName, setUserName] = useState('Johny');

  useEffect(() => {
    // Fetch user's name from wherever it's stored
    const user = fetchUserName(); // Example function to fetch user's name
    setUserName(user);
  }, []);
  return (
    <div>
     
      <Events userName={userName} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/RSO" element={<RSO />} />
          <Route path="/Events" element={<UserName />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const fetchUserName = () => {
  // Simulate fetching the user's name from some source (e.g., an API call) 
  return 'John Doey'; // Return a placeholder name for demonstration purposes
};
export default App;
