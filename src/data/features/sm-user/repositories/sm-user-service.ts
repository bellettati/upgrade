import SMUser from '@/domain/models/sm_user'
import SMUserRepositoryDisk from './disk/sm-user-repository-disk'

class SMUserService {
    constructor(private readonly disk: SMUserRepositoryDisk) {}

    async create(data: SMUser): Promise<SMUser> {
        return this.disk.create(data)
    }
}

export default SMUserService