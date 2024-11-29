'use server'
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID } from "@/appwriteKey.config";
import { databases } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";

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

// get appointment 
export const getAppointment = async (appointmentId:string)=>{
    try {

        const appointment = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )
        return parseStringify(appointment)  
    } catch (error) {
           console.error(
            "An error occurred while retrieving the existing patient:",
             error
          );
    }
}

// get recent appointment
export const getRecentAppointmentList= async ()=>{
    try {

        const appointments= await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        );

        const initialCount = {
            scheduledCount:0,
            pendingCount:0,
            cancelledCount:0
        } 
        const counts = (appointments.documents as Appointment[])
        .reduce((acc,appointment)=>{
            switch(appointment.status){
                case "scheduled":
                    acc.scheduledCount++; break;
                case "pending":
                    acc.pendingCount++; break;
                case "cancelled":
                    acc.cancelledCount++; break;

            }
            return acc;
        },initialCount)

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents:appointments.documents
        }
        return parseStringify(data)
    } catch (error) {
        
    }
}

export const updateAppointment = async ({
    appointmentId,
    userId,
    timeZone,
    appointment,
    type
}:UpdateAppointmentParams) =>{
  try {
    
    const updateAppointment = await databases.updateDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
        appointment
   )
   if(!updateAppointment)
      throw new Error("Something went wrong")
    // send a SMS notification
 
    console.log(updateAppointment);
    revalidatePath("/admin");
    return parseStringify(updateAppointment);

  } catch (error) {
    console.log(error)
    console.log("Some thing went wrong")
  }

}