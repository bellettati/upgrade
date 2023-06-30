import SMUserRepositoryDisk from '@/data/features/sm-user/repositories/disk/sm-user-repository-disk'
import SMUser from '@/domain/models/sm_user'

class SMUserRepositoryDiskSpy implements SMUserRepositoryDisk {
    public smUserData?: SMUser
    public callCount = 0
    public smUsers: Array<SMUser> = []
    
    async create(data: SMUser): Promise<SMUser> {
        this.smUserData = data
        this.callCount++
        this.smUsers.push(data)
        return new SMUser(data)
    }
    
    async findByUsername(username: string): Promise<SMUser | null> {
        const smUser = this.smUsers.find(user => user.username === username) 
        return smUser ? smUser : null
    }
}

export default SMUserRepositoryDiskSpy