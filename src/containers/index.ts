import { SMUserRepositoryDiskMongo } from '@/data/features/sm-user/repositories/disk/mongo/sm-user-repository-disk-mongo'
import SMUserRepositoryDisk from '@/data/features/sm-user/repositories/disk/sm-user-repository-disk'
import SMUserService from '@/data/features/sm-user/repositories/sm-user-service'
import CreateSMUser from '@/domain/usecases/sm-user/create-sm-user'
import { SMUserController } from '@/presentation/controllers/sm-users/sm-user-controller.'
import { InjectionMode, asClass, createContainer } from 'awilix'

interface Cradle {
    //controllers
    smUserController: SMUserController,

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
        createSMUser: asClass(CreateSMUser),
        smUserService: asClass(SMUserService),
        smUserRepositoryDisk: asClass(SMUserRepositoryDiskMongo)
    })

    container.resolve('smUserController')
    container.resolve('createSMUser')
    container.resolve('smUserService')
    container.resolve('smUserRepositoryDisk')
}

export { container, setupContainer }