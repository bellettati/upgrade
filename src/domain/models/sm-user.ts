import { IsEmail, Length } from 'class-validator'

type SMUserProps = {
    username: string,
    email: string,
    password: string
}

class SMUser {
    @Length(3, 30)
    public username: string

    @IsEmail()
    @Length(5, 150)
    public email: string

    @Length(8, 150)
    public password: string
    
    constructor({ username, email, password }: SMUserProps) {
        this.username = username
        this.email = email
        this.password = password
    }
}

export default SMUser