const express = require('express');
const { Todo } = require('../models/user')
const authenticateToken = require('../middleware/authenticateToken')
const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
    try {
        const { text, completed } = req.body
        const todo = await Todo.create( {
            text,
            completed: completed || false,
            UserId: req.user.id,
        });
        res.json(todo)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating todo "});
    }
});

router.get("/", authenticateToken, async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: { UserId: req.user.id },
        });
        res.json(todos)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error getting todos" })
    }
})

router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const { text, completed } = req.body;
        const todo = await Todo.findOne({
            where: { id: req.params.id, UserId: req.user.id },
        });
        if (!todo) return res.status(404).json( { message: "Todo not found" })
        todo.text = text ?? todo.text;
        todo.completed = completed ?? todo.completed;
        await todo.save();
        res.json(todo);
    }
    catch (err) {
        res.status(500).json({ message: "Error updating todo" });
    }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const todo = await Todo.findOne({
            where: { id: req.params.id, UserId: req.user.id }
        })
        if (!todo) return res.status(404).json({ message: "Todo not found"})
        await todo.destroy()
        res.json({ message: "Deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Error deleting todo" });
    }
});

module.exports = router