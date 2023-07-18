import { describe, expect, it } from 'vitest'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

type AccessTokenData = {
    iss: string
    sub: string
    aud: string
    typ: string
    customClaims?: any
}

class GenerateAccessToken {
    async exec(payload: AccessTokenData): Promise<string> {
        const secret = process.env.JWT_AT_SECRET as string
        const typ = 'at+jwt'    
        const token = jwt.sign(payload, secret, { expiresIn: '1h', notBefore: '1m' })
        return token 
    }
}

function makeSUT(): GenerateAccessToken {
    const SUT = new GenerateAccessToken()
    return SUT
}

const tokenPayload: AccessTokenData = {
    iss: process.env.JWT_ISSUER as string,
    sub: 'john@email.com',
    aud: process.env.JWT_AUDIENCE as string,
    typ: 'at+jwt',
    customClaims: {}
}

describe('GenerateAccessToken', () => {
    it('should generate access token', async () => {
        const SUT = makeSUT()
        
        const token = await SUT.exec(tokenPayload)


    })
})