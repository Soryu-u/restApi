let lists = require("../json/lists.json");

function getId(array, currentId) {
  return array.find((t) => t.id === currentId);
}

const getAll = () => {
  return lists;
};

const getTask = (taskId) => {
  const currentListId = getId(lists, taskId);

  if (currentListId) {
    return currentListId.tasks;
  }
};

const getList = (listId) => {
  const currentList = getId(lists, listId);

  if (currentList) {
    return currentList;
  }
};

const createList = (data) => {
  const newList = {
    id: lists.length + 1,
    listTitle: data.listTitle,
    tasks: [],
  };

  lists.push(newList);
  return lists;
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
    return task;
  }
};

const deleteList = (listId) => {
  const currentList = getId(lists, listId);

  if (currentList) {
    const deleteList = lists.filter((l) => l.id !== listId);
    return (lists = deleteList);
  }
};

const deleteTask = (listId, taskId) => {
  let currentList = getId(lists, listId);

  if (currentList) {
    const task = currentList.tasks.find((t) => t.id === taskId);

    if (task) {
      const deleteTask = currentList.tasks.filter(
        (element) => element.id !== taskId
      );
      return (currentList.tasks = deleteTask);
    }
  }
};

const updateTask = (listId, taskId, data) => {
  const currentListTasks = getId(lists, listId).tasks;
  const task = getId(currentListTasks, taskId);

  if (task) {
    Object.assign(task, data);
    return task;
  }
};

const updateList = (listId, data) => {
  const currentList = getId(lists, listId);

  if (currentList) {
    currentList.listTitle = data.listTitle;
    return currentList;
  }
};

const putTask = (listId, taskId, data) => {
  const currentListTasks = getId(lists, listId).tasks;
  const task = getId(currentListTasks, taskId);

  if (task) {
    const updatedTask = {
      taskTitle: data.taskTitle,
      done: false,
    };

    Object.assign(task, updatedTask);
    return task;
  }
};

const putList = (listId, data) => {
  const currentList = getId(lists, listId);

  if (currentList) {
    const updatedList = {
      listTitle: data.listTitle,
      tasks: [],
    };

    Object.assign(currentList, updatedList);
    return currentList;
  }
};

module.exports = {
  getAll,
  getTask,
  getList,
  createTask,
  createList,
  deleteList,
  deleteTask,
  updateTask,
  updateList,
  putTask,
  putList,
};
