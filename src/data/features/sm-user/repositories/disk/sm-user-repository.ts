import SMUser from '@/domain/models/sm_user'

interface SMUserRepository {
    create(data: SMUser): Promise<SMUser>
}

export default SMUserRepository