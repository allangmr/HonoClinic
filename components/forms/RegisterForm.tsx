"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"


const RegisterForm = ({user}: {user: User}) => {
  const router = useRouter();
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
      const user = await createUser(userData);
      if(user) router.push(`/patients/${user.$id}/register`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 🙌</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>
        <CustomFormField 
          fieldType={FormFieldType.Input}
          control={form.control} 
          name="name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User Icon"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
              fieldType={FormFieldType.Input}
              control={form.control} 
              className="xl:w-1/2"
              name="email"
              label="Email"
              placeholder="jhondoe@allan.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField 
              fieldType={FormFieldType.Phone_Input}
              control={form.control} 
              className="xl:w-1/2"
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
        </div>

        
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
              fieldType={FormFieldType.Date_Picker}
              control={form.control} 
              className="xl:w-1/2"
              name="birthDate"
              label="Date of Birth"
            />
            <CustomFormField 
              fieldType={FormFieldType.Skeleton}
              control={form.control} 
              name="gender"
              label="Gender"
              className="xl:w-1/2"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderSkeleton={(field: any) => (
                  <FormControl>
                      <RadioGroup 
                          className="flex h-11 gap-6 xl:justify-between" 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                      >
                          {GenderOptions.map((option) => (
                                  <div key={option} className="radio-group">
                                      <RadioGroupItem value={option} id={option} />
                                      <Label 
                                          htmlFor={option} 
                                          className="cursor-pointer">
                                              {option}
                                      </Label>
                                  </div>
                              )
                          )}
                      </RadioGroup>
                  </FormControl>
              )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
              fieldType={FormFieldType.Input}
              control={form.control} 
              className="xl:w-1/2"
              name="address"
              label="Address"
              placeholder="14th Street, New York"
            />
            <CustomFormField 
              fieldType={FormFieldType.Input}
              control={form.control}
              className="xl:w-1/2"
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.Input}
            control={form.control} 
            className="xl:w-1/2"
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
          />
          <CustomFormField 
            fieldType={FormFieldType.Phone_Input}
            control={form.control}
            className="xl:w-1/2"
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(555) 123-4567"
          />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row">
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
        </div>
        <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
