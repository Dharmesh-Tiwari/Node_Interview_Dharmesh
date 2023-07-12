const express = require("express");
const multer = require("multer");
const Pet = require("../models/Pet"); // Assuming your Pet model is in a separate file

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

// Set up multer upload
const upload = multer({ storage });

// POST /pet/:petId/uploadImage
router.post(
  "/pet/:petId/uploadImage",
  upload.single("image"),
  async (req, res) => {
    try {
      const petId = req.params.petId;
      const additionalData = req.body.additionalData;
      const file = req.file;

      // Update the pet with the uploaded image
      const pet = await Pet.findOneAndUpdate(
        { id: petId },
        { $push: { photoUrls: file.filename } },
        { new: true }
      );

      // Handle any additional logic or response here
      res.json({ pet, message: "Image uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to upload image" });
    }
  }
);

// POST /pet
router.post("/pet", async (req, res) => {
  try {
    const petData = req.body;

    // Create a new pet
    const pet = new Pet(petData);

    // Save the pet to the database
    await pet.save();

    res.json({ pet, message: "Pet added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add pet" });
  }
});

// PUT /pet
router.put("/pet", async (req, res) => {
  try {
    const petData = req.body;

    // Update the pet by its ID
    const updatedPet = await Pet.findOneAndUpdate({ id: petData.id }, petData, {
      new: true,
    });

    if (!updatedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json({ pet: updatedPet, message: "Pet updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update pet" });
  }
});

// GET /pet/findByStatus
router.get("/pet/findByStatus", async (req, res) => {
  try {
    const { status } = req.query;

    // Convert comma-separated status string to an array
    const statusArray = status.split(",");

    // Find pets based on the provided status array
    const pets = await Pet.find({ status: { $in: statusArray } });

    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get pets by status" });
  }
});

// GET /pet/:petId
router.get("/pet/:petId", async (req, res) => {
  try {
    const petId = req.params.petId;

    // Validate if the petId is a valid number
    if (isNaN(petId)) {
      return res.status(400).json({ error: "Invalid ID supplied" });
    }

    // Find the pet by its ID
    const pet = await Pet.findOne({ id: petId });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get pet by ID" });
  }
});

// POST /pet/:petId
router.post("/pet/:petId", async (req, res) => {
  try {
    const petId = req.params.petId;
    const name = req.body.name;
    const status = req.body.status;

    // Validate if the petId is a valid number
    if (isNaN(petId)) {
      return res.status(400).json({ error: "Invalid ID supplied" });
    }

    // Find the pet by its ID
    const pet = await Pet.findOne({ id: petId });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    // Update the pet's name and status
    pet.name = name;
    pet.status = status;

    // Save the updated pet to the database
    await pet.save();

    res.json({ pet, message: "Pet updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update pet" });
  }
});

// DELETE /pet/:petId
router.delete("/pet/:petId", async (req, res) => {
  try {
    const petId = req.params.petId;

    // Validate if the petId is a valid number
    if (isNaN(petId)) {
      return res.status(400).json({ error: "Invalid ID supplied" });
    }

    // Find and delete the pet by its ID
    const deletedPet = await Pet.findOneAndDelete({ id: petId });

    if (!deletedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete pet" });
  }
});

module.exports = router;
