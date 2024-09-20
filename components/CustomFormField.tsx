import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input/input";
import { E164Number } from "libphonenumber-js/core";
import flags from 'react-phone-number-input/flags'

interface customeProps {
  control: Control<any>;
  formFieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: customeProps }) => {
  const { formFieldType, iconSrc, iconAlt, placeholder } = props;
  switch (props.formFieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border  border-dark-500 bg-dark-400">
           {iconSrc &&
                              <Image 
                               src={iconSrc}
                               height={24}
                               width={24}
                               alt={iconAlt || 'icon'}
                               className="ml-2"
                               /> 
            }
            <FormControl>
                <Input 
                 placeholder={placeholder}
                {...field} 
                className="shad-input border-0"
                />
            </FormControl>

        </div>
      );
      case FormFieldType.PHONE_INPUT:
        return(
            <FormControl>
                <PhoneInput
                 flags={flags}
                  defaultCountry="US"
                  placeholder={placeholder}
                  international
                  withCountryCallingCode
                  value={field.value as E164Number | undefined}
                  onChange={field.onChange}
                  className="input-phone flex w-full"
                />
            </FormControl>
        )
  }
};

const CustomFormField = (props: customeProps) => {
  const { control, formFieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem className="">
          {formFieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
