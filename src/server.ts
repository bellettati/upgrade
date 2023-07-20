import 'reflect-metadata'
import { setupContainer } from './infra/di-setup'
setupContainer()


import app from './app'
const PORT = 3333
app.listen(PORT, () => console.log(`running on port ${PORT}`))