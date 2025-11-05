import { Farm } from "../models/farm.model.js";

export const createFarm = async (req, res) => {
  try {
    const { plotSize, cropType, location, userId } = req.body;
    if (!plotSize || !cropType || !location) {
      return res.json({ success: false, message: "All fileds are required" });
    }

    const newFarm = await Farm.create({
      plotSize,
      cropType,
      location,
      userId,
    });

    await newFarm.save();
    res.send({
      success: true,
      message: "Farm Details Submitted Successfully",
      farm: newFarm,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getFarm = async (req, res) => {
  try {
    const { userId } = req.body;

    const farm = await Farm.findOne({ userId });
    if (!farm) {
      return res
        .status(404)
        .json({ success: false, message: "Farm not found" });
    }

    return res.send({ success: true, farm });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateFarm = async (req, res) => {
  try {
    const user = req.user;

    const { plotSize, cropType, location } = req.body;

    const update = {};
    if (plotSize !== undefined) update.plotSize = plotSize;
    if (cropType !== undefined) update.cropType = cropType;
    if (location !== undefined) update.location = location;

    if (Object.keys(update).length === 0) {
      return res.json({ success: false, message: "No fields to update" });
    }

    const farm = await Farm.findOneAndUpdate(
      { userId: user._id },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found or not owned by user",
      });
    }

    return res.send({
      success: true,
      message: "Farm Details Updated Successfully",
      farm,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteFarm = async (req, res) => {
  try {
    const { userId } = req.body;

    const deleted = await Farm.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Farm not found or not owned by user",
      });
    }

    return res.send({
      success: true,
      message: "Farm Deleted Successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
