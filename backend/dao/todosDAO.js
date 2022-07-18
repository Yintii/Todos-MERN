import mongodb from 'mongodb'
import fetch from 'node-fetch'
const ObjectId = mongodb.ObjectId;

let todos

export default class TodosDAO {
    static async injectDB(conn) {
        if (todos) {
            return
        }
        try {
            todos = await conn.db(process.env.TODOS).collection("todos")
            console.log("successfully connected to todos in the database")
        } catch (error) {
            console.log(
                `Unable to establish a collection handle in TodosDAO: ${error}`
            )
        }
    }


    static async getTodos({
        page = 0,
        todosPerPage = 20,
        user_id
    } = {}) {
        let query
        let cursor

        try {
            cursor = await todos.find({ user_id: user_id })
        } catch (e) {
            console.log(`Unable to issue command: ${e}`)
            return { todosList: [], totalNumTodos: 0 }
        }

        const displayCursor = cursor.limit(todosPerPage).skip(todosPerPage * page)

        try {
            const todosList = await displayCursor.toArray()
            const totalNumTodos = await todos.countDocuments(query)

            return { todosList, totalNumTodos }
        } catch (err) {
            console.error(`Unable to convert cursor to array or problem counting documents: ${err}`)
            return { todosList: [], totalNumTodos: 0 }
        }
    }

    static async addTodo(todo) {
        try {
            return await todos.insertOne(todo)
        } catch (e) {
            console.error(
                `Unable to add todo to database: ${e}`
            )
        }
    }

    static async deleteTodo(id) {
        try {
            return await todos.deleteOne({ "_id": ObjectId(id) });
        } catch (error) {
            console.error("Error while trying to delete todo: ", error.message)
        }
    }

    static async updateTodo(id) {
        try {
            return await todos.updateOne({ "_id": ObjectId(id) }, { $set: { complete: true } });
        } catch (error) {
            console.error("Error while trying to delete todo: ", error.message)
        }
    }

}