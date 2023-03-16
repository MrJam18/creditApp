const ApiError = require("../error/apiError");
const { UsersinTask, Tasks } = require("../models/connections");


class TasksController {
    async getList(req, res, next) {
        const {limit, page, sort, userId} = req.query;
        const offset = page * limit - limit;
        let sortArray = sort.split(',');
        sortArray.unshift(Tasks)
        try{
           const tasksInDB = await UsersinTask.findAndCountAll({limit, offset, order: [sortArray], where: {
                executorId: userId
            }, include: Tasks});
            const tasks = tasksInDB.rows.map((el)=> {
                return el.task;
            })
            return res.json({rows: tasks, count: tasksInDB.count});   
    }
    catch(e) {
        console.log(e);
        next(ApiError.internal(e.message));
    }
    }
}

module.exports = new TasksController();