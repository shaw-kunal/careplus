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
import { FormFieldType } from "@/costants";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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
  const { formFieldType,
    iconSrc,
    iconAlt,
    placeholder,
    disabled,
    showTimeSelect,
    dateFormat,
    renderSkeleton
  } = props;
  switch (formFieldType) {
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
              disabled={disabled}
              className="shad-input border-0"
            />
          </FormControl>

        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl className="flex">
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            disabled={disabled}
            className={`input-phone ${disabled && "opacity-50 cursor-not-allowed"}`}
          />
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/icons/calendar.svg"
            height={24}
            width={24}
            alt={iconAlt || 'icon'}
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) =>  field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>

      )

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>


      );



    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={disabled}
          />
        </FormControl>
      )

      
      case FormFieldType.CHECKBOX:
   return (
    <FormControl>
      <div className="flex items-center gap-4">
        <Checkbox 
        id={props.name}
        onCheckedChange={field.onChange}
        checked={field.value}
          />  
          <Label htmlFor={props.name} className="checkbox-label" >
            {props.label}
          </Label>
      </div>
    </FormControl>
   )

    case FormFieldType.SKELETON:
      return (renderSkeleton ? renderSkeleton(field) : null)
  }
};

const CustomFormField = (props: customeProps) => {
  const { control, formFieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          {formFieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-orange-500 text-sm"/>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
