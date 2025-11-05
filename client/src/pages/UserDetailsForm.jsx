import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Crop, Ruler, Leaf } from "lucide-react";
import SplitFormLayout from "../components/SplitFormLayout";
import AuthFormCard from "../components/AuthFormCard";
import "../styles/LoginPage.css";
import "../styles/PageAnimations.css";
import { useFarm } from "../contexts/FarmContext";

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plotSize: "",
    cropType: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const { createFarm, deleteFarm } = useFarm();
  const cropOptions = [
    { value: "wheat", label: "Wheat (Gehoon)" },
    { value: "rice", label: "Rice (Chawal)" },
    { value: "sugarcane", label: "Sugarcane (Ganna)" },
    { value: "cotton", label: "Cotton (Kapas)" },
    { value: "maize", label: "Maize (Makka)" },
    { value: "tomato", label: "Tomato (Tamatar)" },
    { value: "potato", label: "Potato (Aloo)" },
    { value: "onion", label: "Onion (Pyaz)" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createFarm(formData.plotSize, formData.cropType, formData.location);
  };

  return (
    <SplitFormLayout>
      <AuthFormCard>
        <div className="login-form-header animate-fade-in-up">
          <div className="login-logo">
            <Leaf className="login-logo-icon" />
            <h2 className="login-logo-text">Farm Details</h2>
          </div>
          <p className="login-subtitle">
            Tell us about your farm to get personalized recommendations
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group animate-fade-in-up animate-delay-200">
            <label htmlFor="plotSize" className="login-form-label">
              Plot Size (Zameen ka Naap)
            </label>
            <div className="relative">
              <Ruler className="login-input-icon" />
              <input
                id="plotSize"
                name="plotSize"
                type="number"
                step="0.1"
                min="0"
                required
                value={formData.plotSize}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Enter plot size in acres"
              />
            </div>
          </div>

          <div className="login-form-group animate-fade-in-up animate-delay-400">
            <label htmlFor="cropType" className="login-form-label">
              Crop Type (Fasal ka Prakaar)
            </label>
            <div className="relative">
              <Crop className="login-input-icon" />
              <select
                id="cropType"
                name="cropType"
                required
                value={formData.cropType}
                onChange={handleChange}
                className="login-form-input"
                style={{ paddingLeft: "3rem" }}
              >
                <option value="">Select your crop</option>
                {cropOptions.map((crop) => (
                  <option key={crop.value} value={crop.value}>
                    {crop.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="login-form-group animate-fade-in-up animate-delay-600">
            <label htmlFor="location" className="login-form-label">
              Location (Jagah)
            </label>
            <div className="relative">
              <MapPin className="login-input-icon" />
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Enter your location (City, State)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-submit-button animate-fade-in-up animate-delay-800"
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          <div className="login-form-links animate-fade-in-up animate-delay-800">
            <Link to="/" className="login-form-link">
              Back to Home
            </Link>
          </div>
        </form>
      </AuthFormCard>
    </SplitFormLayout>
  );
};

export default UserDetailsForm;
