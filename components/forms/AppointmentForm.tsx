"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrite.types"

const AppointmentForm = ({userId, patientId, type, appointment, setOpen}: {
    userId: string;
    patientId: string;
    type: "create" | "cancel" | "schedule";
    appointment?: Appointment;
    setOpen: (value: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case 'schedule':
        status = "scheduled";
        break;
      case 'cancel':
        status = "cancelled";
        break;
      case 'create':
        status = "pending";
        break;
      default:
        break;
    }
    try {
      if(type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        }
        const appointment = await createAppointment(appointmentData);
        if(appointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
        }
      } else {
        if (!appointment?.$id) return;
        
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment.$id,
          appointment: {
            primaryPhysician: appointment?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type
        }

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if(updatedAppointment) {
          if(setOpen) setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }

  }

  let buttonLabel;
  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'create':
      buttonLabel = 'Request Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === 'create' && <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment 🙌</h1>
          <p className="text-dark-700">Request a new appointment in 10 seconds</p>
        </section>}

        { type !== "cancel" && (
            <>
                <CustomFormField
                    fieldType={FormFieldType.Select}
                    control={form.control}
                    className="xl:w-full"
                    name="primaryPhysician"
                    label="Doctor"
                    placeholder="Select a Doctor"
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
                <CustomFormField 
                    fieldType={FormFieldType.Date_Picker}
                    control={form.control} 
                    className="xl:w-full"
                    name="schedule"
                    label="Expected appointment date"
                    showTimeSelect
                    dateFormat="MM/dd/yyyy - h:mm aa"
                />
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.Textarea}
                        control={form.control} 
                        name="reason"
                        label="Reason for appointment"
                        placeholder="Enter your reason for appointment"
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.Textarea}
                        control={form.control}
                        name="note"
                        label="Notes"
                        placeholder="Enter notes for the appointment"
                    />
                </div>
            </>
        )}

        { type === "cancel" && (
            <CustomFormField 
                fieldType={FormFieldType.Textarea}
                control={form.control}
                name="cancellationReason"
                label="Reason for cancellation"
                placeholder="Enter your reason for cancellation"
            />
        )}

        <SubmitButton isLoading={isLoading} 
            className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
            {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
