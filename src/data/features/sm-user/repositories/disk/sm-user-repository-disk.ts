import SMUser from '@/domain/models/sm_user'

interface SMUserRepositoryDisk {
    create(data: SMUser): Promise<SMUser>
    findByUsername(username: string): Promise<SMUser | null>
}

export default SMUserRepositoryDisk