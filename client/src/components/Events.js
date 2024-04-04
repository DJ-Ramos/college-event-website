import React from 'react';
import "../App.js";
const Events = ({userName}) => {
    console.log('Received userName prop:', userName); // Log the received prop value to the console
  
    return (
      <div>
        
        <h1>Welcome to Events!</h1>
        <h2>Hello again {userName}!</h2>
      <p>Here are some events from your college/university you might be interested:</p>
      </div>
    );
  };
  export default Events;