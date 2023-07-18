import SMUser from '@/domain/models/sm-user'
import SMUserRepositoryDisk from '../sm-user-repository-disk'
import { SMUserModel } from './models/sm-user-mongo'

export class SMUserRepositoryDiskMongo implements SMUserRepositoryDisk {
    async create(data: SMUser): Promise<SMUser> {
        const smUser = await SMUserModel.create(data)
        return smUser    
    }

    async findByUsername(username: string): Promise<SMUser | null> {
        const smUser = await SMUserModel.findOne({ username })
        return smUser
    }

    async findByEmail(email: string): Promise<SMUser | null> {
        const smUser = await SMUserModel.findOne({ email })
        return smUser
    }
    
}