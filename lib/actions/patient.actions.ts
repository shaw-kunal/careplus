import { ID, Query } from "node-appwrite"
import {   databases, ENDPOINT, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";

import { InputFile } from 'node-appwrite/file';
import { DATABASE_ID, NEXT_PUBLIC_BUCKET_ID, PATIENT_COLLECTION_ID, PROJECT_ID } from "@/appwriteKey.config";

export const createUser =  async (user:CreateUserParams) =>{

    try {
   const newUser = await users.create(
    ID.unique(),
    user.email,
    user.phone,
    undefined,
    user.name
   );

   console.log({newUser});
   return parseStringify(newUser)
    } 
    catch (error:any) {
         if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email',[user.email])
            ])
             return documents?.users[0];
         } 
         console.log(error)
    }
     

}





// get user
export const getUser = async (userId: string)=>{
    try {
        const user = await users.get(userId);
        return user;
    } catch (error) {
        console.error(error)
    }
}


// register action patient
export const registerPatient  = async( {identificationDocument, ...patient}:RegisterUserParams)=>{
console.log("bucket id")
console.log(NEXT_PUBLIC_BUCKET_ID)
    try {
        let file;
        
        if(identificationDocument)
        {
            const inputFile = InputFile.fromBuffer(
                identificationDocument.get('blob') as Blob,
                identificationDocument.get('fileName') as string
            )
           file = await storage.createFile(NEXT_PUBLIC_BUCKET_ID!,ID.unique(),inputFile)
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
              identificationDocumentId: file?.$id ? file.$id : null,
              identificationDocumentUrl: file?.$id
                ? `${ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                : null,
              ...patient,
            }
          );

          return newPatient;
        
    } catch (error) {
        console.error("An error occurred while creating a new patient:", error);

    }

}


