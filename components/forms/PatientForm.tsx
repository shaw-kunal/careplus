"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { formSchema } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldType } from "@/costants";




const PatientForm = () => {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      phone:""
    },
  });
  


  async function onSubmit({name,email,phone}: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    try{
      console.log("function call")
      setIsLoading(true);
      const userData = {name, email,phone};
       const user = await createUser(userData);

       if(user) 
       {
           router.push(`patients/${user?.$id}/register`)
       }

    }catch(err){
      console.log(err);
    }
    finally{
      setIsLoading(false);
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-12 space-y-4">
          <h1 className="header">Hi there ✅</h1>
          <p className="text-dark-700">Schedule You first appointment</p>
        </div>

        <CustomFormField 
         formFieldType={FormFieldType.INPUT}
         control={form.control} 
         name="name"
         label="Full name"
         iconSrc="/icons/user.svg"
         placeholder="kk shaw"
         iconAlt="icon"
         />

          
        <CustomFormField 
         formFieldType={FormFieldType.INPUT}
         control={form.control} 
         name="email"
         label="Email Address"
         placeholder="kkshaw@gmail.com"
         iconSrc="/icons/email.svg"
         iconAlt="icon"
         />

        <CustomFormField 
         formFieldType={FormFieldType.PHONE_INPUT}
         control={form.control} 
         name="phone"
         label="Phone Number"
         placeholder="+(91) 6289197569"
        />
        <SubmitButton isLoading={isLoading}  >Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
