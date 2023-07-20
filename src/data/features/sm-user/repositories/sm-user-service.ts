import { SMUser } from '@/domain/models/sm-user'
import { SMUserRepositoryDisk } from './disk/sm-user-repository-disk'

export class SMUserService {
    constructor(private smUserRepositoryDisk: SMUserRepositoryDisk) {}

    create = async (data: SMUser): Promise<SMUser> => 
        this.smUserRepositoryDisk.create(data)
    
    findByUsername = async (username: string): Promise<SMUser | null> => 
        this.smUserRepositoryDisk.findByUsername(username)
    
    findByEmail = async (email: string): Promise<SMUser | null> => 
        this.smUserRepositoryDisk.findByEmail(email)
}