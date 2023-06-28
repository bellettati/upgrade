import SMUserRepository from '@/data/features/sm-user/repositories/disk/sm-user-repository'
import SMUser from '@/domain/models/sm_user'
import { validateOrReject } from 'class-validator'

class CreateSMUser {
    constructor(private readonly smUserRepository: SMUserRepository) {}
    
    async exec(smUserData: SMUser): Promise<SMUser> {
        try {
            await validateOrReject(new SMUser(smUserData))
            return await this.smUserRepository.create(smUserData)
        } catch(error: any) {
            console.log('error has been thrown')
            throw Error(error)
        }
    }
}

export default CreateSMUser