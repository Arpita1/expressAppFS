import { Router, Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

const tasksRouter = Router();

// GET all tasks
tasksRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET task by ID
tasksRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// POST create a task
tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
    }
    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT update a task
tasksRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// DELETE a task
tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
     res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

export default tasksRouter;
