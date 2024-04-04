
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
<<<<<<< HEAD
import Home from "./components/Home"; // Check the import statement
import RSO from "./components/RSO"; 
import Events from "./components/Events"; 
=======
>>>>>>> a5bc3ec197720804119be603ccaaa4b2586a924f
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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          <Route path="/RSO" element={<RSO />} />
          <Route path="/Events" element={<UserName />} />
=======
          <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> a5bc3ec197720804119be603ccaaa4b2586a924f
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
