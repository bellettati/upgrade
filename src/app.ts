import express, { Express } from 'express'

class App {
    public express: Express

    constructor() {
        this.express = express()
    }
}

export default new App().express