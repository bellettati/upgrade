import SMUser from '@/domain/models/sm-user'

interface SMUserRepositoryDisk {
    create(data: SMUser): Promise<SMUser>
    findByUsername(username: string): Promise<SMUser | null>
    findByEmail(email: string): Promise<SMUser | null>
}

export default SMUserRepositoryDisk