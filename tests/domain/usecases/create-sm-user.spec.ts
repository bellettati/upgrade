import { setupContainer } from '../../containers/index'
setupContainer()

import SMUserService from '@/data/features/sm-user/repositories/sm-user-service'
import SMUser from '@/domain/models/sm_user'
import CreateSMUser from '@/domain/usecases/sm-user/create-sm-user'
import { describe, expect, it } from 'vitest'
import SMUserRepositoryDiskSpy from '../../data/features/sm-user/repositories/disk/sm-user-repository-disk-spy'


type MakeSUTOutput = {
    SUT: CreateSMUser,
    smUserDiskRepository: SMUserRepositoryDiskSpy
}
const makeSUT = (): MakeSUTOutput => {
    const smUserDiskRepository = new SMUserRepositoryDiskSpy()
    const smUserService = new SMUserService(smUserDiskRepository)
    const SUT = new CreateSMUser(smUserService)
    return { SUT, smUserDiskRepository }
}


const smUser = new SMUser({ username: 'john_lucas', email: 'john.mendoza@email.com', password: 'john1234' })

describe('CreateSMUser', () => {
    it('should create new SMUser', async () => {
        const { SUT, smUserDiskRepository } = makeSUT()

        await SUT.exec(smUser)

        expect(smUserDiskRepository.smUserData).toBe(smUser)
        expect(smUserDiskRepository.callCount).toBe(1)
    })

    it('should throw error when username is inavlid', async () => {
        const { SUT } = makeSUT()

        const smUserMinInvalidUsername = { ...smUser, username: 'jo' }
        const smUserMaxInvalidUsername = { ...smUser, username: 'johnlucasbellettatimendoza00000' }

        await expect(SUT.exec(smUserMinInvalidUsername))
            .rejects
            .toThrow()

        await expect(SUT.exec(smUserMaxInvalidUsername))
            .rejects
            .toThrow()
    })

    it('should throw error when email is invalid', async () => {
        const { SUT } = makeSUT()

        const smUserInavlidEmail = { ...smUser, email: 'john#email.com' }

        await expect(SUT.exec(smUserInavlidEmail))
            .rejects
            .toThrow()
    })

    it('should throw error when password is inavlid', async () => {
        const { SUT } = makeSUT()

        const smUserInavlidPassword = { ...smUser, password: '1234567' }

        await expect(SUT.exec(smUserInavlidPassword))
            .rejects
            .toThrow()
    })

    it('should throw error when username is already taken', async () => {
        const { SUT } = makeSUT()

        await SUT.exec(smUser)

        await expect(SUT.exec(smUser))
            .rejects
            .toThrow()
    })

    it('should throw error when email is already taken', async () => {
        const { SUT } = makeSUT()

        const newSmUser = { ...smUser, username: 'patrick' }

        await SUT.exec(smUser)

        await expect(SUT.exec(newSmUser))
            .rejects
            .toThrow()
    })
})