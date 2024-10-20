import { ID, Query } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";

import { InputFile } from 'node-appwrite/file';
import { BUILD_MANIFEST } from "next/dist/shared/lib/constants";

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


// register action patien
export const registerPatient  = async( {identificationDocument, ...patient}:RegisterUserParams)=>{

    try {
        let file;
        
        if(identificationDocument)
        {
            const inputFile = InputFile.fromBuffer(
                identificationDocument.get('blob') as Blob,
                identificationDocument.get('fileName') as string
            )
           file = await storage.createFile(BUCKET_ID!,ID.unique(),inputFile)
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
              identificationDocumentId: file?.$id ? file.$id : null,
              identificationDocumentUrl: file?.$id
                ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                : null,
              ...patient,
            }
          );

        
    } catch (error) {
     
    }

}