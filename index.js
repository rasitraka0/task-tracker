const fs = require('fs');
const args = process.argv.slice(2);
const command = args[0];

function loadTasks() {
  let tasks = [];
  if (fs.existsSync('tasks.json')) {
    const data = fs.readFileSync('tasks.json', 'utf-8');
    tasks = JSON.parse(data);
  }
  return tasks;
}

function saveTasks(tasks) {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync('tasks.json', data, 'utf-8');
}

function getNextId(tasks) {
  if (tasks.length === 0) return 1;
  const ids = tasks.map((t) => t.id);
  return Math.max(...ids) + 1;
}

function printTask(task) {
  console.log(`${task.id} - ${task.description} [${task.status}]`);
}

function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (task === undefined) {
    console.log('Erreur : tâche introuvable');
    return;
  }
  task.status = status;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Tâche ${id} marquée comme "${status}"`);
}

if (command === 'add') {
  const tasks = loadTasks();
  const newTask = {
    id: getNextId(tasks),
    description: args[1],
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Tâche ajoutée (ID: ${newTask.id})`);
} else if (command === 'list') {
  const tasks = loadTasks();
  const filter = args[1];
  const result = filter ? tasks.filter((t) => t.status === filter) : tasks;
  result.forEach(printTask);
} else if (command === 'delete') {
  if (!args[1]) {
    console.log('Erreur : tu dois fournir un ID');
  } else {
    const tasks = loadTasks();
    const newTasks = tasks.filter((t) => t.id !== parseInt(args[1]));
    saveTasks(newTasks);
    console.log('Tâche supprimée !');
  }
} else if (command === 'update') {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === parseInt(args[1]));
  if (!task) {
    console.log('Erreur : tâche introuvable');
  } else {
    task.description = args[2];
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log('Tâche mise à jour !');
  }
} else if (command === 'mark-done') {
  markTask(args[1], 'done');
} else if (command === 'mark-in-progress') {
  markTask(args[1], 'in-progress');
} else {
  console.log(
    'Commande inconnue. Commandes disponibles : add, list, delete, update, mark-done, mark-in-progress',
  );
}
