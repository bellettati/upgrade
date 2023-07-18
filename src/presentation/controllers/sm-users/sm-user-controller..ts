import CreateSMUser from '@/domain/usecases/sm-user/create-sm-user'
import { Request, Response } from 'express'
import { CreateSMUserRequestMapper } from './mappers/create-sm-user-request-mapper'
import { CreateSMUserRequest } from './models/requests/create-sm-user-request'

export class UserController {
    constructor(
        private readonly createSMUser: CreateSMUser,
        private readonly createSMUserRequestMapper: CreateSMUserRequestMapper
    ) {}

    async create(req: Request, res: Response) {
        try {
            const request = new CreateSMUserRequest(req.body)
            const smUser = await this.createSMUser.exec(
                this.createSMUserRequestMapper.dataToModel(request)
            )
            return res.json(smUser)
        } catch(err: any) {
            res.status(500).json(err.message)
        }
    }
}