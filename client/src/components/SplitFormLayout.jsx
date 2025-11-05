import React from 'react';
import { Monitor, Target, TrendingUp, Database, Leaf } from 'lucide-react';
import WaterDroplets from './WaterDroplets';
import './SplitFormLayout.css';

const SplitFormLayout = ({ children }) => {
  return (
    <div className="split-form-layout">
      <WaterDroplets />
      
      <div className="split-form-container">
        {/* Left Side - Content */}
        <div className="split-left-section">
          <div className="split-branding animate-slide-left">
            <div className="split-logo">
              <Leaf className="split-logo-icon" />
              <h1 className="split-logo-text">IRIS</h1>
            </div>
            <h2 className="split-headline">Welcome to Your Farm's Command Center</h2>
            <p className="split-description">
              This form is more than just data entry—it's the foundation for a smarter, more productive, and more profitable farm.
            </p>
            <p className="split-description">
              By creating a precise digital record of each plot, you are moving from guesswork to precision agriculture.
            </p>
            
            <div className="split-features">
              <h3 className="split-features-title">What This Form Unlocks for You:</h3>
              
              <div className="split-feature animate-fade-in-up animate-delay-400">
                <Monitor className="split-feature-icon" />
                <div>
                  <h3>A Visual Dashboard</h3>
                  <p>The details you enter here will instantly populate your personal dashboard. See your entire farm's status at a glance.</p>
                </div>
              </div>
              
              <div className="split-feature animate-fade-in-up animate-delay-600">
                <Target className="split-feature-icon" />
                <div>
                  <h3>Resource Optimization</h3>
                  <p>Stop wasting water or fertilizer. By tracking exactly what you use and where, you can allocate resources with pinpoint accuracy, saving money and improving sustainability.</p>
                </div>
              </div>
              
              <div className="split-feature animate-fade-in-up animate-delay-800">
                <TrendingUp className="split-feature-icon" />
                <div>
                  <h3>Powerful Yield Analysis</h3>
                  <p>Understand which crops perform best on which plots. Compare yields from season to season and make data-driven decisions about what to plant next.</p>
                </div>
              </div>
              
              <div className="split-feature animate-fade-in-up animate-delay-800">
                <Database className="split-feature-icon" />
                <div>
                  <h3>Historical Records</h3>
                  <p>Build a living history of your farm. Track crop rotations, soil health, and past treatments, creating an invaluable guide for future planning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="split-right-section">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SplitFormLayout;