import React from 'react';
import { useLocation } from 'react-router-dom';
import { User, MapPin, Crop, Ruler, Leaf, Calendar, Droplets } from 'lucide-react';
import WaterDroplets from '../components/WaterDroplets';
import '../styles/Dashboard.css';
import '../styles/PageAnimations.css';

const Dashboard = () => {
  const location = useLocation();
  const farmData = location.state?.farmData || {};
  
  // Mock user data - in real app, this would come from auth context
  const userData = {
    name: 'John Farmer',
    email: 'john@example.com',
    joinDate: 'January 2024'
  };

  const getCropLabel = (cropValue) => {
    const cropOptions = {
      'wheat': 'Wheat (Gehoon)',
      'rice': 'Rice (Chawal)',
      'sugarcane': 'Sugarcane (Ganna)',
      'cotton': 'Cotton (Kapas)',
      'maize': 'Maize (Makka)',
      'tomato': 'Tomato (Tamatar)',
      'potato': 'Potato (Aloo)',
      'onion': 'Onion (Pyaz)'
    };
    return cropOptions[cropValue] || cropValue;
  };

  return (
    <div className="dashboard-container">
      <WaterDroplets />
      
      <div className="dashboard-header animate-fade-in-up">
        <div className="dashboard-logo">
          <Leaf className="dashboard-logo-icon" />
          <h1>IRIS Dashboard</h1>
        </div>
      </div>

      <div className="dashboard-content">
        {/* User Details Section */}
        <div className="dashboard-section animate-fade-in-up animate-delay-200">
          <div className="section-header">
            <User className="section-icon" />
            <h2>User Details</h2>
          </div>
          <div className="user-info-grid">
            <div className="info-card">
              <h3>Name</h3>
              <p>{userData.name}</p>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <p>{userData.email}</p>
            </div>
            <div className="info-card">
              <h3>Member Since</h3>
              <p>{userData.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Farm Details Section */}
        <div className="dashboard-section animate-fade-in-up animate-delay-400">
          <div className="section-header">
            <Crop className="section-icon" />
            <h2>Farm Details</h2>
          </div>
          <div className="farm-info-grid">
            <div className="info-card">
              <div className="card-header">
                <Ruler className="card-icon" />
                <h3>Plot Size</h3>
              </div>
              <p className="card-value">{farmData.plotSize || 'Not specified'} acres</p>
            </div>
            <div className="info-card">
              <div className="card-header">
                <Crop className="card-icon" />
                <h3>Crop Type</h3>
              </div>
              <p className="card-value">{getCropLabel(farmData.cropType) || 'Not specified'}</p>
            </div>
            <div className="info-card">
              <div className="card-header">
                <MapPin className="card-icon" />
                <h3>Location</h3>
              </div>
              <p className="card-value">{farmData.location || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Irrigation Recommendations Section */}
        <div className="dashboard-section animate-fade-in-up animate-delay-600">
          <div className="section-header">
            <Droplets className="section-icon" />
            <h2>Irrigation Recommendations</h2>
          </div>
          <div className="recommendations-grid">
            <div className="recommendation-card">
              <h3>Today's Watering</h3>
              <p className="recommendation-value">2.5 liters/sq meter</p>
              <p className="recommendation-time">Best time: 6:00 AM - 8:00 AM</p>
            </div>
            <div className="recommendation-card">
              <h3>Weekly Schedule</h3>
              <p className="recommendation-value">3 times per week</p>
              <p className="recommendation-time">Monday, Wednesday, Friday</p>
            </div>
            <div className="recommendation-card">
              <h3>Water Efficiency</h3>
              <p className="recommendation-value">85% efficient</p>
              <p className="recommendation-time">Saving 15% water</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;