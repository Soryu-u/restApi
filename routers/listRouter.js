const router = require("express").Router();
const controller = require("../controllers/ListController");

router.get("", function (req, res) {
  const list = controller.getAll(req);
  checkStatus(list, res, 200, 404);
});

router.get("/:id/tasks", (req, res) => {
  const listId = parseInt(req.params.id);
  const tasks = controller.getTask(listId);
  checkStatus(tasks, res, 200, 404);
});

router.get("/:listId", (req, res) => {
  const listId = parseInt(req.params.listId);

  const list = controller.getList(listId);
  checkStatus(list, res, 200, 404);
});

router.post("", (req, res) => {
  const newList = controller.createList(req.body);
  checkStatus(newList, res, 201, 400);
});

router.post("/:id/tasks", (req, res) => {
  const listId = parseInt(req.params.id);
  const data = req.body;
  const tasks = controller.createTask(listId, data);
  checkStatus(tasks, res, 201, 400);
});

router.delete("/:listId", (req, res) => {
  const listId = parseInt(req.params.listId);
  const newList = controller.deleteList(listId);
  checkStatus(newList, res, 202, 400);
});

router.delete("/:id/tasks", (req, res) => {
  const listId = parseInt(req.params.id);
  const taskId = parseInt(req.body.id);
  const newTasksList = controller.deleteTask(listId, taskId);
  checkStatus(newTasksList, res, 202, 400);
});

router.patch("/:listId/tasks/:taskId", (req, res) => {
  const listId = parseInt(req.params.listId);
  const taskId = parseInt(req.params.taskId);

  const updatedTask = controller.updateTask(listId, taskId, req.body);
  checkStatus(updatedTask, res, 200, 400);
});

router.patch("/:listId", (req, res) => {
  const listId = parseInt(req.params.listId);

  const updatedList = controller.updateList(listId, req.body);
  checkStatus(updatedList, res, 200, 400);
});

router.put("/:listId/tasks/:taskId", (req, res) => {
  const listId = parseInt(req.params.listId);
  const taskId = parseInt(req.params.taskId);

  const putTask = controller.putTask(listId, taskId, req.body);
  checkStatus(putTask, res, 200, 400);
});

router.put("/:listId", (req, res) => {
  const listId = parseInt(req.params.listId);

  const putList = controller.putList(listId, req.body);
  checkStatus(putList, res, 200, 400);
});

function checkStatus(result, res, getDone, getError) {
  if (result) {
    res.status(getDone);
    res.send(result);
    res.end();
  } else {
    res.status(getError).json({ error: `Error ${getError}` });
    res.end();
  }
}

module.exports = router;
