import { APPOINTMENT_COLLECTION_ID, DATABASE_ID } from "@/appwriteKey.config";
import { databases } from "../appwrite.config";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

export const createAppointment = async (
    appointmentData: CreateAppointmentParams
) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID,
            ID.unique(),
            appointmentData
        );

        // revalidatePath("")
        return  parseStringify(newAppointment)
        
    } catch (error) {
        console.error("An error occurred while creating a new appointment")
        
    }
};
