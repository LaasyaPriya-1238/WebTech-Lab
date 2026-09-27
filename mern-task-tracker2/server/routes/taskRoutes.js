const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// Add a new task
router.post("/", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: "Error adding task" });
    }
});

// Update a task
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: "Error updating task" });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting task" });
    }
});

module.exports = router;