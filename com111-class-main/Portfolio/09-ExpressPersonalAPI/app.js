const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'html'));

let names = [];
let tasks = [];
let taskIdCounter = 1;

app.get('/', (req, res) => {
  res.render('index', { 
    names: names,
    tasks: tasks,
    error: null 
  });
});

app.get('/greet', (req, res) => {
  const name = req.query.name;
  if (name && name.trim() !== '') {
    names.push(name.trim());
  }
  res.render('index', { 
    names: names,
    tasks: tasks,
    error: null 
  });
});

app.get('/wazzup/:index', (req, res, next) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= names.length) {
    const error = new Error('Index out of range');
    return next(error);
  }
  
  const name = names[index];
  res.render('wazzup', { name: name });
});

app.post('/task', (req, res) => {
  const newTask = req.body.task;
  if (newTask && newTask.trim() !== '') {
    tasks.push({
      id: taskIdCounter++,
      text: newTask.trim(),
      order: tasks.length
    });
  }
  res.redirect('/');
});

app.delete('/task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  
  tasks.forEach((task, index) => {
    task.order = index;
  });
  
  res.redirect('/');
});

app.put('/task/up/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex > 0) {

    [tasks[taskIndex], tasks[taskIndex - 1]] = [tasks[taskIndex - 1], tasks[taskIndex]];

    tasks.forEach((task, index) => {
      task.order = index;
    });
  }
  
  res.redirect('/');
});

app.put('/task/down/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex < tasks.length - 1 && taskIndex >= 0) {

    [tasks[taskIndex], tasks[taskIndex + 1]] = [tasks[taskIndex + 1], tasks[taskIndex]];

    tasks.forEach((task, index) => {
      task.order = index;
    });
  }
  
  res.redirect('/');
});

app.get('/task', (req, res) => {
  res.json(tasks);
});

app.put('/greet/:name', (req, res) => {
  const name = req.params.name;
  if (name && name.trim() !== '' && !names.includes(name)) {
    names.push(name);
  }
  res.json(names);
});

app.use((err, req, res, next) => {
  res.render('index', { 
    names: names,
    tasks: tasks,
    error: err.message 
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});