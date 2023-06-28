import { MaxLength, MinLength } from 'class-validator'

type SMUserData = {
    username: string,
    email: string,
    password: string
}

class SMUser {
    @MinLength(3)
    @MaxLength(30)
    public username: string
    public email: string
    public password: string
    
    constructor({ username, email, password }: SMUserData) {
        this.username = username
        this.email = email
        this.password = password
    }
}

export default SMUser