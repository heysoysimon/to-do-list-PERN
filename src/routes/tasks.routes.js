const {Router} = require('express')
const pool = require('../db')
const {getAllTasks, getTasks, createTasks, deleteTasks, editTask} = require('../controllers/tasks.controller')



const router = Router();

router.get('/tasks', getAllTasks)
    


router.get('/tasks/:id', getTasks)


router.post('/tasks', createTasks)

router.delete('/tasks/:id', deleteTasks)

router.put('/tasks/:id', editTask)


module.exports = router