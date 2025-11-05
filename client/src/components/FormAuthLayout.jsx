import React from 'react';
import WaterDroplets from './WaterDroplets';
import './FormAuthLayout.css';

const FormAuthLayout = ({ children }) => {
  return (
    <div className="form-auth-layout">
      <WaterDroplets />
      <div className="form-auth-container">
        {children}
      </div>
    </div>
  );
};

export default FormAuthLayout;