import { SMUserModel } from '@/data/features/sm-user/repositories/disk/mongo/models/sm-user-mongo'
import { SMUserRepositoryDiskMongo } from '@/data/features/sm-user/repositories/disk/mongo/sm-user-repository-disk-mongo'
import { SMUser } from '@/domain/models/sm-user'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

describe('SMUserRepositoryDiskMongo', () => {
    let mongoServer: MongoMemoryServer
    const userData: SMUser = {
        username: 'john.lucas',
        email: 'john.lucas@email.com',
        password: 'john1234'
    }
    const makeSUT = () => new SMUserRepositoryDiskMongo()

    beforeAll(async () => {
        mongoServer = await  MongoMemoryServer.create()
        const mongoUri = mongoServer.getUri()
        await mongoose.connect(mongoUri, {  })
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoServer.stop()
    })

    beforeEach(async () => {
        await SMUserModel.deleteMany({})
    })

    it('should create a new user', async () => {
        const SUT = makeSUT()
        
        const smUser = await SUT.create(userData)

        expect(smUser.username).toBe(userData.username)
        expect(smUser.email).toBe(userData.email)
    })

    it('should find a user by username', async () => {
        const SUT = makeSUT()

        const username = 'mario'
        const newUser = { ...userData, username }

        SUT.create(newUser)
        const foundUser = await SUT.findByUsername(username)

        expect(foundUser).toBeTruthy()
        expect(foundUser?.username).toBe(username)
    })

    it('should return null when user is not found by username', async () => {
        const SUT = makeSUT()

        const foundUser = await SUT.findByUsername('some.username')

        expect(foundUser).toBeFalsy()
        expect(foundUser).toBeNull()
    })

    it('should find a user by email', async () => {
        const SUT = makeSUT()

        const email = 'mario@email.com'
        const newUser = { ...userData, email }

        SUT.create(newUser)
        const foundUser = await SUT.findByEmail(email)

        expect(foundUser).toBeTruthy()
        expect(foundUser?.email).toBe(email)
    }) 

    it('should return null when user is not found by username', async () => {
        const SUT = makeSUT()

        const foundUser = await SUT.findByEmail('some.username')

        expect(foundUser).toBeFalsy()
        expect(foundUser).toBeNull()
    })
})