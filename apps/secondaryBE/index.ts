import { configDotenv } from "dotenv"
import express from "express"
import cors from "cors"
import { userRouter } from "./router/userRouter"

configDotenv()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", userRouter)

app.listen(8000, () => {
    console.log("App listening on port 8000")
})
