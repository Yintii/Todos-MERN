import bcrpyt from 'bcrypt'
import JWT from 'jsonwebtoken'

let users

export default class AuthDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.TODOS).collection("users")
        } catch (error) {
            console.error(
                `Unable to establish a connection handle in authDAO: ${error}`
            )
        }
    }


    static async login(username, password) {
        try {
            let account = await users.find({
                username: username
            }).toArray()

            let token = false;

            let match = bcrpyt.compareSync(password, account[0].password)

            console.log("Match: ", match)

            if (match) {
                token = JWT.sign(
                    {
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        username: account[0].username,
                        user_id: account[0]._id
                    },
                    process.env.SECRET
                )
            }

            return token

        } catch (error) {
            console.error(
                `Unable to find user`
            )
            return false
        }
    }

    /* 
        NEED TO CREATE A REGISTRATION ROUTE AND HANDLER
    */

    static async logout() {
        try {
            localStorage.removeItem("user")
            navigate("/login")
        } catch (error) {
            console.error("unable to logout ", error)
        }
    }

}