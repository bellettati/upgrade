import { SMUserService } from '@/data/features/sm-user/repositories/sm-user-service'
import { SMUser } from '@/domain/models/sm-user'
import { validateOrReject } from 'class-validator'

export class CreateSMUser {
    constructor(private smUserService: SMUserService) {}
    
    public exec = async (smUserData: SMUser): Promise<SMUser> => {
        const { username, email } = smUserData

        try {
            await validateOrReject(new SMUser(smUserData))
            const usernameIsTaken = await this.smUserService.findByUsername(username)
            const emailIsTaken = await this.smUserService.findByEmail(email)
            
            if(usernameIsTaken) {
                throw Error('Username is taken')
            }

            if(emailIsTaken) {
                throw Error('Email has been taken')
            }
            
            return await this.smUserService.create(smUserData)
        } catch(error: any) {
            throw Error(error)
        }
    }
}