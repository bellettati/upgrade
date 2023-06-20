import { describe, expect, it } from 'vitest'

type CreateSMUserData = {
    username: string
    email: string
    password: string
}

const smUser: CreateSMUserData = {
    username: 'john',
    email: 'john@email.com',
    password: 'john12345'
}

interface SMUserRepository {
    create(data: CreateSMUserData): Promise<void>
}

class SMUserRepositoryMock implements SMUserRepository {
    smUserData?: CreateSMUserData
    
    async create(data: CreateSMUserData): Promise<void> {
        this.smUserData = data
    }
}

class CreateSMUser {
    constructor(private readonly smUserRepository: SMUserRepository) {}    
    
    async exec(smUserData: CreateSMUserData): Promise<void> {
        await this.smUserRepository.create(smUserData)
    }
}

describe('CreateSMUser', () => {
    it('should create new SMUser', async () => {
        const smUserRepository = new SMUserRepositoryMock()
        const SUT = new CreateSMUser(smUserRepository)

        await SUT.exec(smUser)

        expect(smUserRepository.smUserData).toBe(smUser)
    })
})