import AuthDAO from "../dao/authDAO.js";

export default class AuthController {
    static async apiPostLogin(req, res, next) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const user = await AuthDAO.login(username, password);

            console.log("User token: ", user);

            res.json({ status: "success", message: "logged in", user: user })
        } catch (error) {
            res.status(500).json({ error: error.message, user: false })
        }
    }

    /**
     * Need to add a handler for the registration of a user
    */

    static async apiPostRegistration(req, res, next) {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const registrant = await AuthDAO.register(username, password);

            console.log(registrant);

            res.json({ status: "success", message: "Registered successfully" })

        } catch (error) {
            res.status(500).json({ error: error.message })

        }
    }


    static async apiGetLogout(req, res, next) {
        try {
            await AuthDAO.logout();
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}