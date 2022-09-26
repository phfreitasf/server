import express from 'express'
import cors from 'cors'
import { router } from '../routes/routes'

const app = express()
const httpsPort = 3333
const httpPort = 3332

app.use(express.json())
app.use(cors())
app.use(router)


export { app, httpsPort, httpPort, express }