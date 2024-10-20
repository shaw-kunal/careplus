"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { formSchema, PatientFormValidation } from "@/lib/validation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldType, IdentificationTypes, PatientFormDefaultValues } from "@/costants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions } from "@/costants";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@radix-ui/react-select";
import Image from "next/image";
import FileUplaoder from "../FileUplaoder";
import { setTime } from "react-datepicker/dist/date_utils";

const RegisterForm = ({ user }: { user: User | undefined }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name,
      email: user?.email,
      phone: user?.phone
    },
  });


  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
   console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-12 space-y-4">
          <h1 className="header">Welcome {user?.name} 👋</h1>
          <p className="text-dark-700">Let's us know more about yourself!</p>
        </div>

        <section className="space-y-6">
          <div className="mb-8 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          formFieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          disabled
          iconSrc="/icons/user.svg"
          iconAlt="icon"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              disabled
              placeholder="kkshaw@gmail.com"
              iconSrc="/icons/email.svg"
              iconAlt="icon"
            />
          </div>
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              label="Phone Number"
              disabled
              name="phone"
              placeholder="+(91) 6289197569"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
            />
          </div>

          <div className="flex-1">

            <CustomFormField
              formFieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>


        </div>
        <div className="flex flex-col gap-6 xl:flex-row w-ful">
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="New York"
            />

          </div>
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Developer"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row w-ful">
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="EmergencyContactName"
              placeholder="Guardient's name"
            />

          </div>
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="EmergencyContactNumber"
              placeholder="(+91) 6290220703"
            />
          </div>
        </div>
   {/*  PERSONAL INFORMATION*/}
   <section className="space-y-6">
          <div className="mb-8 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>


        <CustomFormField
          formFieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary care physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem key={doctor.name + i} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>


        <div className="flex flex-col gap-6 xl:flex-row w-ful">
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="Bluse cross BluseShield"
            />
          </div>
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABC123456789"
            />
          </div>
        </div>


        <div className="flex flex-col gap-6 xl:flex-row w-ful">
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin"
            />

          </div>
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="Iburofen 200mg , peraectamon 500mg"
            />
          </div>
        </div>

        {/* FAMILY MEDICATION & PAST MEDICATIONS */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="flex-1">
            <CustomFormField
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label=" Family medical history (if relevant)"
              placeholder="Mother had brain cancer, Father has hypertension"
            />
          </div>
          <div className="flex-1">

            <CustomFormField
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history"
              placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
            />
          </div>
        </div>

        {/* IDENTIFICATION AND VERIFICATION */}


        <CustomFormField
          formFieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((item, i) => (
            <SelectItem key={item + i} value={item}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{item}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          formFieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="123456789"
        />

        <CustomFormField
          formFieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanner Copy of identification document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUplaoder files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-8 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField
          formFieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition."
        />

        <CustomFormField
          formFieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />



        <CustomFormField
          formFieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />
     

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;


/* 



*/