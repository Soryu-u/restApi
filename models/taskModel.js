const lists = require("../json/lists.json");

function getId(array, currentId) {
  return array.find((t) => t.id === currentId);
}

const getTask = (id) => {
  const listId = getId(lists, id);

  if (listId) {
    return listId.tasks;
  }
};

const createTask = (listId, data) => {
  const currentList = getId(lists, listId);

  const task = {
    id: currentList.tasks.length + 1,
    taskTitle: data.taskTitle,
    done: false,
  };

  if (currentList) {
    currentList.tasks.push(task);
    return currentList.tasks;
  }
};

const deleteTask = (listId, taskId) => {
  let currentList = getId(lists, listId);

  if (currentList) {
    const task = getId(currentList.tasks, taskId);

    if (task) {
      const deleteTask = currentList.tasks.filter((t) => t.id !== taskId);
      return (currentList.tasks = deleteTask);
    }
  }
};

const updateTask = (listId, taskId, data) => {
  const currentList = getId(lists, listId).tasks;
  const task = getId(currentList, taskId);

  if (task) {
    Object.assign(task, data);
    return task;
  }
};

const putTask = (listId, taskId, data) => {
  const currentList = getId(lists, listId).tasks;
  const task = getId(currentList, taskId);

  if (task) {
    const updatedTask = {
      taskTitle: data.taskTitle,
      done: false,
    };

    Object.assign(task, updatedTask);
    return task;
  }
};

module.exports = {
  getTask,
  createTask,
  deleteTask,
  updateTask,
  putTask,
};
