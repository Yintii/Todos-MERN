import express from "express"
import TodosCtrl from "./todos.controller.js"
import AuthCtrl from "./auth.controller.js"

const router = express.Router()

router.route("/").get(TodosCtrl.apiGetAllTodos)

router.route("/").post(TodosCtrl.apiPostTodo)

router.route("/delete").post(TodosCtrl.apiDeleteTodo)

router.route("/complete").post(TodosCtrl.apiCompleteTodo)

router.route("/login").post(AuthCtrl.apiPostLogin)

router.route("/logout").get(AuthCtrl.apiGetLogout)

router.route("/register").post(AuthCtrl.apiPostRegistration)

export default router;