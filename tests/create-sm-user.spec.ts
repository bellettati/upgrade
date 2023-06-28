import SMUserRepositoryDisk from '@/data/features/sm-user/repositories/disk/sm-user-repository-disk'
import SMUserService from '@/data/features/sm-user/repositories/sm-user-service'
import SMUser from '@/domain/models/sm_user'
import CreateSMUser from '@/domain/usecases/sm-user/create-sm-user'
import { describe, expect, it } from 'vitest'

class SMUserRepositoryDiskMock implements SMUserRepositoryDisk {
    public smUserData?: SMUser
    public callCount = 0
    
    async create(data: SMUser): Promise<SMUser> {
        this.smUserData = data
        this.callCount++
        return new SMUser(data)
    }
}

type makeSUTOutput = {
    SUT: CreateSMUser,
    smUserDiskRepository: SMUserRepositoryDiskMock
}
const makeSUT = (): makeSUTOutput => {
    const smUserDiskRepository = new SMUserRepositoryDiskMock()
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
})