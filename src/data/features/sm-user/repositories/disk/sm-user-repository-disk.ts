import { SMUser } from '@/domain/models/sm-user'

export interface SMUserRepositoryDisk {
    create(data: SMUser): Promise<SMUser>
    findByUsername(username: string): Promise<SMUser | null>
    findByEmail(email: string): Promise<SMUser | null>
}