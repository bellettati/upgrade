import express, { Express } from 'express'

class App {
    public express: Express

    constructor() {
        this.express = express()

        this.middleware()
    }

    private middleware() {
        this.express.use(express.json())
    }
}

export default new App().express