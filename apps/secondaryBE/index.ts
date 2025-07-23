import { configDotenv } from "dotenv"
import express from "express"
import cors from "cors"
import { userRouter } from "./router/userRouter"
import { startGoogleAuth } from "./controllers/google/startAuth"
import { googleCallback } from "./controllers/google/googleCallback"

configDotenv()

const app = express()
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())

app.use("/api", userRouter)

app.get("/oauth/google/start", startGoogleAuth)
app.get("/oauth/google/callback", googleCallback)

app.listen(8000, () => {
    console.log("App listening on port 8000")
})
