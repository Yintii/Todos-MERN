import express from "express"
// import TodosCtrl from "./todos.controller.js"
import AuthCtrl from "./auth.controller.js"

const router = express.Router()

// router.route("/").get(TodosCtrl.apiGetTodos)

router.route("/login").post(AuthCtrl.apiPostLogin)

router.route("/logout").get(AuthCtrl.apiGetLogout)

export default router;