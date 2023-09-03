import React from 'react';
import './about.css'
import Navbar from '../Navbar/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-card">
          <h1>About Us</h1>
          <pre>
            <strong>
              This is automation of Tally to make entry
            </strong>
          </pre>
          <a href="#">Learn More</a>
        </div>
      </div>
    </>
  );
};

export default About;
