// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const  Task  = require('./db/models').Task;

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

// MongoDB Connection
const uri = 'mongodb+srv://airtonvasconcelosjr:airton1990@cluster0.pw72ph9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado ao Banco de dados!");
}).catch((e) => {
  console.log("Erro ao tentar conectar ao banco de dados");
  console.log(e);
});

// Route to list all tasks
app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Erro ao buscar tasks.' });
    });
});

// Route to create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description }); 
  newTask.save()
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Erro ao criar task.' });
    });
});


// Route to update a task
app.put('/tasks/:taskId', (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;
  Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true })
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Erro ao atualizar task.' });
    });
});

// Route to delete a task
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  Task.findByIdAndRemove(taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({ error: 'Task não encontrada.' });
      }
      res.send(task);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Erro ao excluir task.' });
    });
});

// Filter by title, status, or date
app.get('/tasks/filter', (req, res) => {
  const { title, status, date } = req.query;

  const query = {};

  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  if (status) {
    query.status = status;
  }

  if (date) {
    query.createdAt = { $gte: new Date(date) };
  }

  Task.find(query)
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Erro ao buscar tasks.' });
    });
});

// Pagination (In case of many tasks)
app.get('/tasks/pagination', (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const skip = (pageNumber - 1) * limitNumber;

  Task.find()
    .skip(skip)
    .limit(limitNumber)
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Erro ao buscar tasks.' });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na port ${PORT}`);
});
