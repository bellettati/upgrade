import SMUserRepositoryDisk from '@/data/features/sm-user/repositories/disk/sm-user-repository-disk'
import SMUser from '@/domain/models/sm_user'

class SMUserRepositoryDiskSpy implements SMUserRepositoryDisk {
    public smUserData?: SMUser
    public callCount = 0
    
    async create(data: SMUser): Promise<SMUser> {
        this.smUserData = data
        this.callCount++
        return new SMUser(data)
    }
}

export default SMUserRepositoryDiskSpy