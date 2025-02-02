"use server";
import { ID, Query } from "node-appwrite"
import { account, BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";


export const createUser = async (user: CreateUserParams) => {
    
    try {
        const newUser = await account.create(ID.unique(), user.email, 'password', user.name);
        return parseStringify(newUser);
    } catch (error: unknown) {
        if(error && typeof error === 'object' && 'code' in error && error.code === 409) {
            const documents = await users.list([
                Query.equal('email', user.email)
            ])

            return documents?.users[0]
        }
    }
}

export const getUser = async(userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.error(error);
    }
}

export const registerPatient = async({identificationDocument, ...patient} : RegisterUserParams) => {
    try {
        let file;
        if(identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob, 
                identificationDocument?.get('fileName') as string
            )
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }
        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentURL: 
                    `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...patient
            }
        )
        return parseStringify(newPatient);
    } catch (error) {
        console.error(error);
    }
}