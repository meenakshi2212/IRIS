import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Brain, Gauge, Sprout } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/LandingPage.css';
import '../styles/PageAnimations.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <Navbar />
      
      <div className="content-grid">
        {/* Left Column - Branding & Features */}
        <div className="branding-section animate-slide-left">
          <h1 className="hero-headline animate-fade-in-up">IRIS: AI-Powered Smart Irrigation</h1>
          <p className="hero-description animate-fade-in-up animate-delay-200">
            Optimize water usage, enhance crop health, and simplify farm management with intelligent automation. 
            A proof-of-concept for sustainable agriculture.
          </p>
          
          <ul className="benefits-list">
            <li className="benefit-item animate-fade-in-up animate-delay-400">
              <Gauge className="benefit-icon" />
              <div>
                <strong>Real-time Sensor Data:</strong> Precision monitoring.
              </div>
            </li>
            <li className="benefit-item animate-fade-in-up animate-delay-600">
              <Brain className="benefit-icon" />
              <div>
                <strong>AI-Driven Scheduling:</strong> Adaptive watering plans.
              </div>
            </li>
            <li className="benefit-item animate-fade-in-up animate-delay-800">
              <Droplets className="benefit-icon" />
              <div>
                <strong>Water Conservation:</strong> Reduce waste, save resources.
              </div>
            </li>
          </ul>
        </div>

        {/* Right Column - Call to Action */}
        <div className="cta-section animate-slide-right">
          <h2 className="cta-headline animate-fade-in-up animate-delay-200">Experience the Future of Farming</h2>
          
          <div className="visual-container animate-fade-scale animate-delay-400">
            <Sprout className="visual-icon" />
          </div>
          
          <div className="button-group animate-fade-in-up animate-delay-600">
            <Link to="/details" className="btn-access">
              Add Your Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;