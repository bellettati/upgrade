// Update the import statements with relative paths instead of '@' alias
import { SMUserRepositoryDiskMongo } from '../data/features/sm-user/repositories/disk/mongo/sm-user-repository-disk-mongo'
import SMUserRepositoryDisk from '../data/features/sm-user/repositories/disk/sm-user-repository-disk'
import SMUserService from '../data/features/sm-user/repositories/sm-user-service'
import CreateSMUser from '../domain/usecases/sm-user/create-sm-user'
import { CreateSMUserRequestMapper } from '../presentation/controllers/sm-users/mappers/create-sm-user-request-mapper'
import { SMUserController } from '../presentation/controllers/sm-users/sm-user-controller.'
import { InjectionMode, asClass, createContainer } from 'awilix'

interface Cradle {
    //controllers
    smUserController: SMUserController,

    //mappers-presentation
    createSMUserRequestMapper: CreateSMUserRequestMapper,

    //use-cases
    createSMUser: CreateSMUser,

    //services
    smUserService: SMUserService,

    //repositories
    smUserRepositoryDisk: SMUserRepositoryDisk
}

const container = createContainer<Cradle>({ injectionMode: InjectionMode.PROXY })

const setupContainer = () => {
    container.register({
        smUserController: asClass(SMUserController),
        createSMUserRequestMapper: asClass(CreateSMUserRequestMapper),
        createSMUser: asClass(CreateSMUser),
        smUserService: asClass(SMUserService),
        smUserRepositoryDisk: asClass(SMUserRepositoryDiskMongo) // Use the correct class here
    })

    container.resolve('smUserRepositoryDisk')
    container.resolve('smUserService')
    container.resolve('createSMUser')
    container.resolve('createSMUserRequestMapper')
    container.resolve('smUserController')
}

export { container, setupContainer }
