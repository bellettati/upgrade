import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { smUserRouter } from './presentation/routes/sm-user-router'

class App {
    public express: Express

    constructor() {
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    private middleware() {
        this.express.use(cors())
        this.express.use(express.json())
    }

    private database() {
        mongoose.connect('mongodb://127.0.0.1:27017/test')
            .then(() => console.log('connected to DB'))
    }

    private routes() {
        this.express.use(smUserRouter)
    }
}

export default new App().express