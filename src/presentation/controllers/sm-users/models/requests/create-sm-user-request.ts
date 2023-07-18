import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

type CreateSMUserRequestProps = {
    username: string
    email: string
    password: string
}

export class CreateSMUserRequest {
    @IsString()
    @IsNotEmpty()
    @Length(8, 30)
    username: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 150)
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 150)
    password: string

    constructor({ username, email, password }: CreateSMUserRequestProps) {
        this.username = username
        this.email = email
        this.password = password
    }
}