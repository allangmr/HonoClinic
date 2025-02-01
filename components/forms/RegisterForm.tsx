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
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"


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
          className="xl:w-full"
          name="name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="User Icon"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
              fieldType={FormFieldType.Date_Picker}
              control={form.control} 
              name="birthDate"
              label="Date of Birth"
            />
            <CustomFormField 
              fieldType={FormFieldType.Skeleton}
              control={form.control} 
              name="gender"
              label="Gender"
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
              name="address"
              label="Address"
              placeholder="14th Street, New York"
            />
            <CustomFormField 
              fieldType={FormFieldType.Input}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.Input}
            control={form.control} 
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian's Name"
          />
          <CustomFormField 
            fieldType={FormFieldType.Phone_Input}
            control={form.control}
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

        <CustomFormField 
            fieldType={FormFieldType.Select}
            control={form.control}
            className="xl:w-full"
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a Physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursour-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-dark-500"
                  />
                  <p>
                    {doctor.name}
                  </p>
                </div>
              </SelectItem>
            ))}
        </CustomFormField>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
              fieldType={FormFieldType.Input}
              control={form.control} 
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="Blue Cross Blue Shield"
            />
            <CustomFormField 
              fieldType={FormFieldType.Input}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABC123456"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
              fieldType={FormFieldType.Textarea}
              control={form.control} 
              name="allergies"
              label="Allergies(if any)"
              placeholder="Peanuts, Seafood, Penicillin, Pollen"
            />
            <CustomFormField 
              fieldType={FormFieldType.Textarea}
              control={form.control}
              name="currentMedications"
              label="Current Medications"
              placeholder="IbuProfen 200mg, Paracetamol 500mg"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
              fieldType={FormFieldType.Textarea}
              control={form.control} 
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="Diabetes, Hypertension, Cancer"
            />
            <CustomFormField 
              fieldType={FormFieldType.Textarea}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="Asthma, Chicken Pox, Malaria"
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Identification and Verification</h2>
            </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.Select}
            control={form.control}
            className="xl:w-full"
            name="identificationType"
            label="Identification Type"
            placeholder="Select an Identification Type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField 
          fieldType={FormFieldType.Input}
          control={form.control} 
          className="xl:w-full"
          name="identificationNumber"
          label="Identification Number"
          placeholder="1234567890"
        />

        <CustomFormField 
          fieldType={FormFieldType.Skeleton}
          control={form.control} 
          className="xl:w-full"
          name="identificationDocument"
          label="Scanned Copy of Identification Document"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderSkeleton={(field: any) => (
              <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
          )}
        />

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Consent and Privacy</h2>
            </div>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.Checkbox}
          control={form.control} 
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition."
        />

        <CustomFormField 
          fieldType={FormFieldType.Checkbox}
          control={form.control} 
          name="disclosureConsent"
          label="I consent to the use and disclosure of my health information for treatment purposes."
        />

        <CustomFormField 
          fieldType={FormFieldType.Checkbox}
          control={form.control} 
          name="privacyConsent"
          label="I acknowledge that I have reviewed and agree to the privacy policy."
        />

        <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
