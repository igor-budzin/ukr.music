import React, { Component } from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span>Made by Ihor Budzinskiy</span>
        <span style={{ float: 'right' }}>Copyright &copy; Cabin of Pilot {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;