import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/the-hub-of-secuos-high-resolution-logo.png';



const Container = styled.div`
  background-image: url(${backgroundImage}); /* Set background image */
  background-size: cover; /* Cover the entire container with the image */
  background-position: center; /* Center the background image */
  color: #fff; /* Text color */
  min-height: 100vh; /* Minimum height of the container, ensuring it fills the viewport */
  
  font-size: 18px; /* Font size */
  font-family: 'Arial', sans-serif; /* Font family */
  
  /* Add more styles as needed */
`;

const RSO = () => {
  return (
    <Container>
      <h1>Welcome to our website!</h1>
      <p>This is a description of our website.</p>
    </Container>
  );
};

export default RSO;



