import { BaseMapper } from '@/infra/base/base-mapper'
import { CreateSMUserRequest } from '../models/requests/create-sm-user-request'
import { SMUser } from '@/domain/models/sm-user'

export class CreateSMUserRequestMapper extends BaseMapper<CreateSMUserRequest, SMUser> {
    modelToData(model: SMUser): CreateSMUserRequest {
        return new CreateSMUserRequest({
            username: model.username,
            email: model.email,
            password: model.password
        })
    }
    dataToModel(data: CreateSMUserRequest): SMUser {
        return new SMUser({
            username: data.username,
            email: data.email,
            password: data.password
        })
    }
}
