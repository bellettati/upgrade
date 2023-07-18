import { Document, Schema, model } from 'mongoose'

interface SMUserDocument extends Document {
    username: string
    email: string
    password: string
}

const SMUserSchema = new Schema<SMUserDocument>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    }, 
    { timestamps: true }
)

const SMUserModel = model<SMUserDocument>('SMUser', SMUserSchema)

export { SMUserDocument, SMUserModel }