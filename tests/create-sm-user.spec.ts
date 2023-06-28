import { validateOrReject } from 'class-validator'
import SMUser from '@/domain/models/sm_user'
import { describe, expect, it } from 'vitest'

type CreateSMUserData = {
    username: string
    email: string
    password: string
}

interface SMUserRepository {
    create(data: CreateSMUserData): Promise<SMUser>
}

type makeSUTOutput = {
    SUT: CreateSMUser,
    smUserRepository: SMUserRepositoryMock
}
const makeSUT = (): makeSUTOutput => {
    const smUserRepository = new SMUserRepositoryMock()
    const SUT = new CreateSMUser(smUserRepository)

    return { SUT, smUserRepository }
}
class SMUserRepositoryMock implements SMUserRepository {
    public smUserData?: CreateSMUserData
    public callCount = 0
    
    async create(data: CreateSMUserData): Promise<SMUser> {
        this.smUserData = data
        this.callCount++
        return new SMUser(data)
    }
}
class CreateSMUser {
    constructor(private readonly smUserRepository: SMUserRepository) {}
    
    async exec(smUserData: CreateSMUserData): Promise<SMUser> {
        try {
            await validateOrReject(new SMUser(smUserData))
            return await this.smUserRepository.create(smUserData)
        } catch(error: any) {
            console.log('error has been thrown')
            throw Error(error)
        }
    }
}

const smUser: CreateSMUserData = {
    username: 'john',
    email: 'john@email.com',
    password: 'john12345'
}

describe('CreateSMUser', () => {
    it('should create new SMUser', async () => {
        const { SUT, smUserRepository } = makeSUT()

        await SUT.exec(smUser)

        expect(smUserRepository.smUserData).toBe(smUser)
        expect(smUserRepository.callCount).toBe(1)
    })

    it('should throw error when username is inavlid', async () => {
        const { SUT } = makeSUT()

        const smUserMinInvalidUsername: CreateSMUserData = { ...smUser, username: 'jo' }
        const smUserMaxInvalidUsername: CreateSMUserData = { ...smUser, username: 'johnlucasbellettatimendoza00000' }

        await expect(SUT.exec(smUserMinInvalidUsername))
            .rejects
            .toThrow()

        await expect(SUT.exec(smUserMaxInvalidUsername))
            .rejects
            .toThrow()
    })
})