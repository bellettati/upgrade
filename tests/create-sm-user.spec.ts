import SMUserRepositoryDisk from '@/data/features/sm-user/repositories/disk/sm-user-repository-disk'
import SMUser from '@/domain/models/sm_user'
import CreateSMUser from '@/domain/usecases/sm-user/create-sm-user'
import { describe, expect, it } from 'vitest'

type makeSUTOutput = {
    SUT: CreateSMUser,
    smUserRepository: SMUserRepositoryDiskMock
}
class SMUserRepositoryDiskMock implements SMUserRepositoryDisk {
    public smUserData?: SMUser
    public callCount = 0
    
    async create(data: SMUser): Promise<SMUser> {
        this.smUserData = data
        this.callCount++
        return new SMUser(data)
    }
}

const makeSUT = (): makeSUTOutput => {
    const smUserRepository = new SMUserRepositoryDiskMock()
    const SUT = new CreateSMUser(smUserRepository)

    return { SUT, smUserRepository }
}


const smUser = new SMUser({ username: 'john_lucas', email: 'john.mendoza@email.com', password: 'john1234' })

describe('CreateSMUser', () => {
    it('should create new SMUser', async () => {
        const { SUT, smUserRepository } = makeSUT()

        await SUT.exec(smUser)

        expect(smUserRepository.smUserData).toBe(smUser)
        expect(smUserRepository.callCount).toBe(1)
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