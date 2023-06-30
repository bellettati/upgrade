import SMUserRepositoryDisk from '@/data/features/sm-user/repositories/disk/sm-user-repository-disk'
import SMUserService from '@/data/features/sm-user/repositories/sm-user-service'
import CreateSMUser from '@/domain/usecases/sm-user/create-sm-user'
import { asClass, createContainer, InjectionMode } from 'awilix'
import SMUserRepositoryDiskSpy from 'tests/data/features/sm-user/repositories/disk/sm-user-repository-disk-spy'

interface Cradle {
    createSmUser: CreateSMUser,
    smUserService: SMUserService,
    smUserRepositoryDisk: SMUserRepositoryDisk
}

const container = createContainer<Cradle>({
    injectionMode: InjectionMode.PROXY
})

function setupContainer() {
    container.register({
        smUserRepositoryDisk: asClass(SMUserRepositoryDiskSpy),
        smUserService: asClass(SMUserService),
        createSmUser: asClass(CreateSMUser)
    })

    container.resolve('smUserRepositoryDisk')
    container.resolve('smUserService')
    container.resolve('createSmUser')
}

export { container, setupContainer }
