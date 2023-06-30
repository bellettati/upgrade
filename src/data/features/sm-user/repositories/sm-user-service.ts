import SMUser from '@/domain/models/sm_user'
import SMUserRepositoryDisk from './disk/sm-user-repository-disk'

class SMUserService {
    constructor(private readonly disk: SMUserRepositoryDisk) {}

    async create(data: SMUser): Promise<SMUser> {
        return this.disk.create(data)
    }

    async findByUsername(username: string): Promise<SMUser | null> {
        return this.disk.findByUsername(username)
    }
}

export default SMUserService