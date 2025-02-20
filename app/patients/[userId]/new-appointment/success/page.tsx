import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Success = async ({params, searchParams}: SearchParamProps) => {
    const { userId } = await params;
    const { appointmentId } = await searchParams;
    const appointment = appointmentId as string || '';
    const appointmentDetails = await getAppointment(appointment);
    if (!appointmentDetails) return null
    const doctor = Doctors.find((doctor) => doctor.name === appointmentDetails.primaryPhysician )
    
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href="/">
                <Image 
                    src="/assets/icons/logo-full.svg" 
                    alt="HonoClinic Logo" 
                    width={1000} 
                    height={1000} 
                    className="mb-12 h-10 w-fit" 
                />
            </Link>
            <section className='flex flex-col items-center'>
                <Image 
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={280}
                    alt="success"
                />
                <h2 className='header mb-6 max-w-[600px] text-center'>
                    Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
                </h2>
                <p>We will be in touch shortly to confirm.</p>
            </section>
            <section className='request-details'>
                <p>Requested Appointment details:</p>
                <div className='flex-items-center gap-3'>
                    <Image 
                    src={doctor?.image || '/assets/images/admin.png'} 
                    alt='doctor'
                    width={100}
                    height={100}
                    className='size-6'
                    />
                </div>
                <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                <div className='flex gap-2'>
                    <Image 
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt='calendar'
                    />
                    <p>{formatDateTime(appointmentDetails.schedule).dateTime}</p>
                </div>
            </section>
            <Button variant='outline' className='shad-primary-btn' asChild>
                <Link href={`/patients/${userId}/new-appointment`}>
                    New Appointment
                </Link>
            </Button>
            <p className='copyright'>© 2025 HonoClinic</p>
        </div>
    </div>
  )
}

export default Success