import SMUserService from '@/data/features/sm-user/repositories/sm-user-service'
import SMUser from '@/domain/models/sm_user'
import { validateOrReject } from 'class-validator'

class CreateSMUser {
    constructor(private readonly smUserService: SMUserService) {}
    
    async exec(smUserData: SMUser): Promise<SMUser> {
        const { username } = smUserData

        try {
            await validateOrReject(new SMUser(smUserData))
            const usernameIsTaken = await this.smUserService.findByUsername(username)
            
            if(usernameIsTaken) {
                throw Error('Username is taken')
            }
            
            return await this.smUserService.create(smUserData)
        } catch(error: any) {
            throw Error(error)
        }
    }
}

export default CreateSMUser