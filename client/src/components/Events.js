import {useState} from 'react';
import React from 'react';
import "../App.js";
import MapOfUniversities from '../assets/Map-of-universities.png';
const Events = ({userName}) => {
    {/*console.log('Received userName prop:', userName); // Log the received prop value to the console
    const [name,setName] = useState('mario');
    const [age,setAge] = useState(25);
    const handleClick = () =>
    {
      setName('luigi');
      setAge('30');
    }
  */}


    return (
      <div style={{ backgroundImage: `url(${MapOfUniversities})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"auto", 
        backgroundPosition:"center",
        height: "100vh", // Set the height to 100% of viewport height
        width: "100vw", // Set the width to 100% of viewport width
        overflow: "hidden", // Hide any content that overflows the container     
      }}>
        
        <h1>Welcome to Events!</h1>
        {/*<h2>Hello again {userName}!</h2>
        <p>{ name } is {age} years old</p>
        <button onClick ={handleClick}>Click me</button>
    <p>Here are some events from your college/university you might be interested:</p>*/}
      </div>
    );
  };
  export default Events;