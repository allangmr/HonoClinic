"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"

export enum FormFieldType {
  Input = "input",
  Select = "select",
  Radio = "radio",
  Checkbox = "checkbox",
  Textarea = "textarea",
  Phone_Input = "phoneInput",
  Date_Picker = "datePicker",
  Skeleton =  "skeleton",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone};
      console.log(userData);
      
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 🙌</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField 
          fieldType={FormFieldType.Input}
          control={form.control} 
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User Icon"
        />
        <CustomFormField 
          fieldType={FormFieldType.Input}
          control={form.control} 
          name="email"
          label="Email"
          placeholder="jhondoe@allan.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField 
          fieldType={FormFieldType.Phone_Input}
          control={form.control} 
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
        />
        <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
