
import React from 'react';
import styled from 'styled-components';
import MapOfUniversities from '../assets/Map-of-universities.png';

const Container = styled.div`
  background-image: url(${MapOfUniversities}); /* Set background image */
  background-size: auto; /* Cover the entire container with the image */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat;
  color: black; /* Set text color */
  min-height: 100vh; /* Minimum height of the container, ensuring it fills the viewport */
  width: 100vw; /* Ensure the container fills the entire viewport width */
  font-size: 18px; /* Font size */
  font-family: 'Arial', sans-serif; /* Font family */
  /* Add more styles as needed */
`;

const Events = ({ userName }) => {
  return (
    <Container>
      <h1>Welcome to Events!</h1>
      
    </Container>
  );
};

export default Events;