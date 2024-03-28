// Home.js

import React, { useEffect } from 'react';

import logo from "../assets/the-hub-of-secuos-high-resolution-logo.png";
const Home = () => {
    useEffect(() => {
      // Create a link element
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = logo;
  
      // Append the link element to the document head
      document.head.appendChild(link);
  
      // Cleanup function to remove the link element when the component unmounts
      return () => {
        document.head.removeChild(link);
      };
    }, []); // Empty dependency array to ensure the effect runs only once on component mount
  
    return (
      <div>
        <img src={logo} alt="Secuo logo" />
        <h1>Welcome to our website!</h1>
      </div>
    );
  };

export default Home;
