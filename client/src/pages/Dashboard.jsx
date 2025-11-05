import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, MapPin, Crop, Ruler, Leaf, Droplets, Plus } from "lucide-react";
import WaterDroplets from "../components/WaterDroplets";
import "../styles/Dashboard.css";
import "../styles/PageAnimations.css";
import { useAuth } from "../contexts/AuthContext";
import { useFarm } from "../contexts/FarmContext";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { farm: farmFromContext, deleteFarm } = useFarm();

  const [deleting, setDeleting] = useState(false);

  // Support either context-provided farm or a farm passed via navigation state
  const farmDataFromState = location.state?.farmData || {};
  const farm = farmFromContext || farmDataFromState;

  const userData = {
    name:
      (user?.fullname?.firstname || "") +
      " " +
      (user?.fullname?.lastname || ""),
    email: user?.email || "",
    joinDate: "November 2025",
  };

  const getCropLabel = (cropValue) => {
    const cropOptions = {
      wheat: "Wheat (Gehoon)",
      rice: "Rice (Chawal)",
      sugarcane: "Sugarcane (Ganna)",
      cotton: "Cotton (Kapas)",
      maize: "Maize (Makka)",
      tomato: "Tomato (Tamatar)",
      potato: "Potato (Aloo)",
      onion: "Onion (Pyaz)",
    };
    return cropOptions[cropValue] || cropValue || "Not specified";
  };

  const handleDelete = async () => {
    if (!farm?._id) {
      alert("No farm selected to delete.");
      return;
    }
    const ok = window.confirm("Are you sure you want to delete this farm?");
    if (!ok) return;

    try {
      setDeleting(true);
      const res = await deleteFarm(farm._id); // expects { success, ... }
      if (res?.success) {
        alert("Farm deleted successfully.");
        navigate(-1); // or navigate("/farms");
      } else {
        alert(res?.message || "Failed to delete farm.");
      }
    } catch (err) {
      alert(err?.message || "Error deleting farm.");
    } finally {
      setDeleting(false);
    }
  };

  const handleAddFarm = () => {
    // Navigate to your Add Farm page (replace route as needed)
    navigate("/add-farm");
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
              <p>{userData.name?.trim() || "—"}</p>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <p>{userData.email || "—"}</p>
            </div>
            <div className="info-card">
              <h3>Member Since</h3>
              <p>{userData.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Farm Details Section */}
        <div className="dashboard-section animate-fade-in-up animate-delay-400">
          <div
            className="section-header"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: ".5rem" }}
            >
              <Crop className="section-icon" />
              <h2>Farm Details</h2>
            </div>

            {farm?._id ? (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="danger-button"
                aria-label="Delete Farm"
                title="Delete Farm"
                style={{
                  padding: ".6rem 1rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: deleting ? "not-allowed" : "pointer",
                  opacity: deleting ? 0.7 : 1,
                  background: "#e53935",
                  color: "#fff",
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            ) : (
              <Link
                to="/details"
                onClick={handleAddFarm}
                className="add-button"
                aria-label="Add Farm"
                title="Add Farm"
                style={{
                  padding: ".6rem 1rem",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background: "#43a047",
                  color: "#fff",
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Plus size={18} />
                Add Farm
              </Link>
            )}
          </div>

          {farm?._id ? (
            <div className="farm-info-grid">
              <div className="info-card">
                <div className="card-header">
                  <Ruler className="card-icon" />
                  <h3>Plot Size</h3>
                </div>
                <p className="card-value">
                  {farm?.plotSize != null ? farm.plotSize : "Not specified"}{" "}
                  acres
                </p>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <Crop className="card-icon" />
                  <h3>Crop Type</h3>
                </div>
                <p className="card-value">{getCropLabel(farm?.cropType)}</p>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <MapPin className="card-icon" />
                  <h3>Location</h3>
                </div>
                <p className="card-value">
                  {farm?.location || "Not specified"}
                </p>
              </div>
            </div>
          ) : (
            <p
              style={{
                textAlign: "center",
                fontStyle: "italic",
                marginTop: "1rem",
                color: "#666",
              }}
            >
              No farm details available. Please add your farm to continue.
            </p>
          )}
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
              <p className="recommendation-time">
                Best time: 6:00 AM - 8:00 AM
              </p>
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
