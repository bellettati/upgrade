import SMUser from '@/domain/models/sm_user'

interface SMUserRepositoryDisk {
    create(data: SMUser): Promise<SMUser>
}

export default SMUserRepositoryDisk