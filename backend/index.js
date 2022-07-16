import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
// import TodosDAO from './dao/accountsDAO.js'
import AuthDAO from './dao/authDAO.js'
dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500
    },
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        // await TodosDAO.injectDB(client)
        await AuthDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })