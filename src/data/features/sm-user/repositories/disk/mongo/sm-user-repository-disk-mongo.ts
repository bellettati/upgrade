import { SMUserModel } from './models/sm-user-mongo'
import { SMUserRepositoryDisk } from '../sm-user-repository-disk'
import { SMUser } from '@/domain/models/sm-user'

export class SMUserRepositoryDiskMongo implements SMUserRepositoryDisk {
    create = async (data: SMUser): Promise<SMUser> =>
        await SMUserModel.create(data)

    findByUsername = async (username: string): Promise<SMUser| null> =>
        await SMUserModel.findOne({ username })

    findByEmail = async (email: string): Promise<SMUser| null> => 
        await SMUserModel.findOne({ email })
}