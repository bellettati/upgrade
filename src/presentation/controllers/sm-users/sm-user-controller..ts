import { Request, Response } from 'express'
import { CreateSMUserRequest } from './models/requests/create-sm-user-request'
import { CreateSMUserRequestMapper } from './mappers/create-sm-user-request-mapper'
import { CreateSMUser } from '@/domain/usecases/sm-user/create-sm-user'

interface SMUserControllerProps {
    createSMUser: CreateSMUser 
    createSMUserRequestMapper: CreateSMUserRequestMapper
}

export class SMUserController {
    createSMUser: CreateSMUser 
    createSMUserRequestMapper: CreateSMUserRequestMapper

    constructor({ 
        createSMUser, 
        createSMUserRequestMapper 
    }: SMUserControllerProps) {
        this.createSMUser = createSMUser
        this.createSMUserRequestMapper = createSMUserRequestMapper
    }
    
    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const request = new CreateSMUserRequest(req.body)
            const smUser = await this.createSMUser.exec(
                this.createSMUserRequestMapper.dataToModel(request)
            )
            return res.json(smUser)
        } catch(err: any) {
            return res.status(500).json(err.message)
        }
    }
}
