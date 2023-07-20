import { container } from '@/infra/di-setup'
import { Router } from 'express'

const smUserRouter = Router()
const controller = container.resolve('smUserController')

smUserRouter.post('/auth/register', controller.create)

export { smUserRouter }