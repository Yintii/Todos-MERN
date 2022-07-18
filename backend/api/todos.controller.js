import TodosDAO from "../dao/todosDAO.js";

export default class TodosController {

    static async apiGetAllTodos(req, res, next) {
        const todosPerPage = req.query.todosPerPage ? parseInt(req.query.todosPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
        const user_id = req.query.user_id;

        console.log("USER_ID: ", user_id)

        const { todosList, totalNumTodos } = await TodosDAO.getTodos({
            page,
            todosPerPage,
            user_id
        })

        let response = {
            todosList: todosList,
            page: page,
            entriesPerPage: todosPerPage,
            total_results: totalNumTodos
        }
        res.json(response);
    }


    static async apiDeleteTodo(req, res, next) {
        try {
            let id = req.body.id;
            await TodosDAO.deleteTodo(id);
            console.log("successully deleted")
            res.json({ status: "success" })
        } catch (error) {
            console.error("apiDeleteTodo failed: ", error)
        }
    }

    static async apiCompleteTodo(req, res, next) {
        try {
            let id = req.body.id;
            await TodosDAO.updateTodo(id);
            console.log("successully Updated")
            res.json({ status: "success" })
        } catch (error) {
            console.error("apiCompleteTodo failed: ", error)
        }
    }

    static async apiPostTodo(req, res, next) {
        try {
            let todo = {
                task: req.body.task,
                complete: false,
                user_id: req.body.user_id
            }
            await TodosDAO.addTodo(todo)
            res.json({ status: "success" })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}