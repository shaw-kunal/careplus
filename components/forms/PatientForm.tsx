"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";

export const enum FormFieldType  {
  INPUT ="input",
  TEXTaREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const PatientForm = () => {

  const [isLoading,setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
         name="Phone"
         label="Phone Number"
         placeholder="+(91) 6289197569"
        />
        <SubmitButton isLoading={isLoading} >Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
