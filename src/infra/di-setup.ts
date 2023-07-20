import { SMUserRepositoryDiskMongo } from '@/data/features/sm-user/repositories/disk/mongo/sm-user-repository-disk-mongo'
import { SMUserRepositoryDisk } from '@/data/features/sm-user/repositories/disk/sm-user-repository-disk'
import { SMUserService } from '@/data/features/sm-user/repositories/sm-user-service'
import { CreateSMUser } from '@/domain/usecases/sm-user/create-sm-user'
import { CreateSMUserRequestMapper } from '@/presentation/controllers/sm-users/mappers/create-sm-user-request-mapper'
import { SMUserController } from '@/presentation/controllers/sm-users/sm-user-controller.'
import { InjectionMode, asClass, createContainer } from 'awilix'

interface Cradle {
    smUserController: SMUserController
    createSMUserRequestMapper: CreateSMUserRequestMapper
    createSMUser: CreateSMUser
    smUserService: SMUserService
    smUserRepositoryDisk: SMUserRepositoryDisk
}

const container = createContainer<Cradle>({ injectionMode: InjectionMode.CLASSIC })

const setupContainer = () => {
    container.register({
        smUserController: asClass(SMUserController),
        createSMUserRequestMapper: asClass(CreateSMUserRequestMapper),
        createSMUser: asClass(CreateSMUser),
        smUserService: asClass(SMUserService),
        smUserRepositoryDisk: asClass(SMUserRepositoryDiskMongo)
    })
}

export { container, setupContainer }
