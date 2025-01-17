import request from 'supertest';
import express from 'express';
import tasksRouter from '../routes/tasks';

const app = express();
app.use(express.json());
app.use('/api/tasks', tasksRouter);

describe('Tasks API', () => {
  it('GET /api/tasks -> should return array of tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/tasks -> should create a new task', async () => {
    const newTask = { title: 'New Task' };
    const response = await request(app).post('/api/tasks').send(newTask);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTask.title);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /api/tasks/:id -> should retrieve a specific task', async () => {
    // We know task with id=1 exists initially
    const response = await request(app).get('/api/tasks/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('PUT /api/tasks/:id -> should update the task', async () => {
    const updatedData = { title: 'Updated Title', completed: true };
    const response = await request(app).put('/api/tasks/1').send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.completed).toBe(true);
  });

  it('DELETE /api/tasks/:id -> should delete the task', async () => {
    const response = await request(app).delete('/api/tasks/2');
    expect(response.status).toBe(204);
  });

  it('GET /api/tasks/:id -> 404 if task not found', async () => {
    const response = await request(app).get('/api/tasks/999');
    expect(response.status).toBe(404);
  });
});
