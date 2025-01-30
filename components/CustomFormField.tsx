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
import { Select, SelectContent, SelectValue, SelectTrigger } from "./ui/select"
import { Textarea } from "./ui/textarea"
interface CustomProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>,
    className?: string,
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
    console.log(field, 'field');
    
    const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton} = props;
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
                            selected={field.value ? new Date(field.value) : null} 
                            onChange={(date) => field.onChange(date)} 
                            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            wrapperClassName="date-picker"
                         />
                    </FormControl>
                </div>
            )
        case FormFieldType.Skeleton: return renderSkeleton ? renderSkeleton(field) : null 
        case FormFieldType.Select: return (
            <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="shad-select-trigger">
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="shad-select-content">
                        {props.children}
                    </SelectContent>
                </Select>
            </FormControl>
        )
        case FormFieldType.Textarea: return (
            <FormControl>
                <Textarea 
                    placeholder={placeholder} 
                    {...field}
                    className="shad-textArea"
                    disabled={props.disabled}
                />
            </FormControl>
        )
        default:
            break;
    }
}


const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label, className = "xl:w-1/2" } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
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