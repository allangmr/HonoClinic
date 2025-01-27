"use server";
import { ID, Query } from "node-appwrite"
import { account, users } from "../appwrite.config"
import { parseStringify } from "../utils";



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