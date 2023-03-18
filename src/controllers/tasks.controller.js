const pool = require("../db")

const getAllTasks =  async (req, res,next) => {

    const allTasks = await pool.query('SELECT * FROM task')
    try{
        //throw new Error('ALGO FUE MAL')
        res.json(allTasks.rows)
    }catch (error){
        next(error)
    }
}

const getTasks = async (req, res) => {
try{
    const {id} = req.params
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id])

    if(result.rows.length === 0) 
        return res.status(404).json({
    message: "tarea no encontrada"
    })

    res.json(result.rows[0])
    } catch(error){
        next(error)
    }
}

const createTasks = async (req, res, next) => {
    try{
        const {title, description} = req.body

    const result = await  pool.query("INSERT INTO task (title, description) VALUES($1, $2) RETURNING *",[
        title,
        description,
    ])
    res.json(result.rows[0])
    } catch (error){
        next(error)
    }
}

const deleteTasks = async (req, res, next) => {

    const { id } = req.params

    try{
        const result =  await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id])

   if(result.rowCount === 0){
    return res.status(404).json({
        message: "Task not found",
    })}

    return res.sendStatus(204)
    } catch(error){
        next(error)
    }
}

const editTask = async (req, res, next) => {
    try{
        const {id } = req.params

    const{title, description} = req.body

   const result =  await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
   [title,description,id]
   )

   if(result.rows.length === 0){
    return res.status(404).json({
        message: "task no encontrada"
    })
   }

   console.log(result)
    res.send(result.rows[0])
    }catch(error){
        next(error)
    }
}

module.exports = {
    getAllTasks,
    createTasks,
    deleteTasks,
    editTask,
    getTasks
}