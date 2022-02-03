const router = require("express").Router();
const controller = require("../controllers/TaskController");

router.get("", (req, res) => {
  const listId = parseInt(req.query.listId);

  const tasks = controller.getTask(listId);
  checkStatus(tasks, res, 200, 404);
});

router.post("", (req, res) => {
  const listId = parseInt(req.query.listId);

  const newTask = controller.createTask(listId, req.body);
  checkStatus(newTask, res, 201, 400);
});

router.delete("", (req, res) => {
  const listId = parseInt(req.query.listId);
  const taskId = parseInt(req.body.id);

  const newTasksList = controller.deleteTask(listId, taskId);
  checkStatus(newTasksList, res, 202, 400);
});

router.patch("/:id", (req, res) => {
  const listId = parseInt(req.query.listId);
  const taskId = parseInt(req.params.id);

  const updateTask = controller.updateTask(listId, taskId, req.body);
  checkStatus(updateTask, res, 200, 400);
});

router.put("/:id", (req, res) => {
  const listId = parseInt(req.query.listId);
  const taskId = parseInt(req.params.id);

  const putTask = controller.putTask(listId, taskId, req.body);
  checkStatus(putTask, res, 200, 400);
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
