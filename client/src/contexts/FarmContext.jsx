import React, { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FarmContext = createContext(null);

export const FarmProvider = ({ children }) => {
  const [farm, setFarm] = useState(null);
  const { user, setActionLoading, setLoading } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const fetchFarm = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setLoading(false);
    try {
      const res = await axios.post(`${API_URL}/farms/farm`, {
        userId: user?._id,
      });
      if (res.data.success) {
        setFarm(res.data.farm);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarm();
  }, []);

  const deleteFarm = async () => {
    setActionLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/farms/delete`, {
        userId: user?._id,
      });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const createFarm = async (plotSize, cropType, location) => {
    setActionLoading(true);
    try {
      const res = await axios.post(`${API_URL}/farms/create`, {
        plotSize,
        cropType,
        location,
        userId: user?._id,
      });
      navigate("/dashboard");
      toast.success(res.data.message || "Farm Added Successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setActionLoading(false);
    }
  };
  console.log(farm);

  return (
    <FarmContext.Provider value={{ createFarm, deleteFarm, farm }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  return useContext(FarmContext);
};
