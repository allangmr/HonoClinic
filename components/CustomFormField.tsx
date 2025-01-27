"use client"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import type { E164Number } from 'libphonenumber-js'
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface CustomProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: unknown) => React.ReactNode,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({field, props} : {field: { value: string; onChange: (value: any) => void; name: string; }; props: CustomProps}) => {
    const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat} = props;
    switch (fieldType) {
        case FormFieldType.Input:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image 
                            src={iconSrc} 
                            alt={iconAlt || 'icon'} 
                            width={24} 
                            height={24}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input 
                            {...field}
                            placeholder={placeholder}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.Phone_Input:
            return (
                <FormControl>
                    <PhoneInput 
                        defaultCountry="US"
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            )
        case FormFieldType.Date_Picker:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">   
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calendar"
                        className="ml-2"
                    />
                    <FormControl>
                         <DatePicker 
                            selected={field.value} 
                            onChange={(date) => field.onChange(date)} 
                            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            wrapperClassName="date-picker"
                         />
                    </FormControl>
                </div>
            )
        default:
            break;
    }
}


const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {fieldType !== FormFieldType.Checkbox && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField