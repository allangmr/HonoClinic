"use client"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";

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
    dateFormt?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: unknown) => React.ReactNode,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({field, props} : {field: { value: string; onChange: (value: any) => void; name: string; }; props: CustomProps}) => {
    const {fieldType, iconSrc, iconAlt, placeholder} = props;
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
            break;
    
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